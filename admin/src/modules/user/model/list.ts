import { sample } from "effector";
import { reset } from "patronum";
import { indexBy, prop } from "ramda";

import { createEvent, createStore } from "@app/shared/effector";

import { createPaginationModel } from "@app/infrastructure-entities/pagination";

import { buildGetUsersQuery } from "../api";

type QueryParams = {
    page: number;
    limit: number;
    search: string;
};

const INITIAL_LIMIT = 10;

export type UsersListModel = ReturnType<typeof createUsersListModel>;

export const createUsersListModel = () => {
    const init = createEvent();
    const destroy = createEvent();

    const fetch = createEvent();
    const changeParams = createEvent<Partial<QueryParams>>();

    const query = buildGetUsersQuery();

    const $data = query.$data;
    const $users = $data.map((data) => data?.items ?? []);
    const $total = $data.map((data) => data?.total ?? 0);
    const $usersById = $users.map(indexBy(prop("id")));

    const $params = createStore({ page: 1, limit: INITIAL_LIMIT, search: "" }).on(
        changeParams,
        (state, payload) => ({ ...state, ...payload }),
    );

    const $shownPagination = $total.map((total) => total > INITIAL_LIMIT);
    const $totalPages = $total.map((total) => Math.ceil(total / INITIAL_LIMIT));

    const $$pagination = createPaginationModel({
        page: 1,
        limit: INITIAL_LIMIT,
    });

    sample({
        clock: [init, changeParams],
        target: fetch,
    });

    sample({
        clock: fetch,
        source: $params,
        fn: (params) => ({ params }),
        target: query.start,
    });

    sample({
        clock: $$pagination.changePage,
        source: $params,
        fn: (params, page) => ({ ...params, page }),
        target: changeParams,
    });

    sample({
        clock: $$pagination.updateLimit,
        source: $params,
        fn: (params, limit) => ({ ...params, limit }),
        target: changeParams,
    });

    reset({
        clock: destroy,
        target: $params,
    });

    sample({
        clock: destroy,
        target: [query.reset, $$pagination.destroy],
    });

    return {
        $$pagination,

        $params,
        $users,
        $usersById,
        $isLoading: query.$pending,
        $shownPagination,
        $total,
        $totalPages,

        init,
        destroy,
        fetch,
        changeParams,
    };
};
