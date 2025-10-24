import { sample } from "effector";

import { createEvent } from "@app/shared/effector";

import { buildGetUserSessionsQuery } from "../api";

export type UserSessionsModel = ReturnType<typeof createUserSessionsModel>;

export const createUserSessionsModel = () => {
    const init = createEvent<{ userId: string }>();
    const destroy = createEvent();
    const fetch = createEvent<{ userId: string }>();

    const query = buildGetUserSessionsQuery();

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
        $isLoading: query.$pending,
        $sessions: query.$data,

        init,
        destroy,
        fetch,
    };
};
