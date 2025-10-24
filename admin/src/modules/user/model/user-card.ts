import { sample } from "effector";

import { createEvent } from "@app/shared/effector";

import { buildGetUserQuery } from "../api";

export type UserCardModel = ReturnType<typeof createUserCardModel>;

export const createUserCardModel = () => {
    const init = createEvent<{ id: string }>();
    const destroy = createEvent();
    const fetch = createEvent<{ id: string }>();

    const query = buildGetUserQuery();

    sample({
        clock: init,
        target: fetch,
    });

    sample({
        clock: fetch,
        target: query.start,
    });

    sample({
        clock: destroy,
        target: query.reset,
    });

    return {
        init,
        fetch,
        destroy,

        $user: query.$data,
        $isLoading: query.$pending,
    };
};
