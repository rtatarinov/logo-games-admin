import type { Store } from "effector";
import { combine, restore } from "effector";
import { reset } from "patronum";

import { createEvent, createStore } from "@app/shared/effector";

export type PaginationModel = ReturnType<typeof createPaginationModel>;

export const createPaginationModel = ({
    total,
    offset,
    limit,
}: {
    total: Store<number>;
    offset: number;
    limit: number;
}) => {
    const init = createEvent();
    const destroy = createEvent();

    const changePage = createEvent<number>();
    const updateLimit = createEvent<number>();

    const $limit = restore(updateLimit, limit);
    const $offset = createStore(offset).on(changePage, (_, page) => (page - 1) * limit);

    const $total = combine($limit, total, (limit, total) => Math.ceil(total / limit));
    const $current = combine($offset, $limit, (offset, limit) => Math.floor(offset / limit) + 1);

    reset({
        clock: destroy,
        target: [$limit, $offset],
    });

    return {
        $limit,
        $offset,
        $total,
        $current,

        init,
        destroy,
        changePage,
        updateLimit,
    };
};
