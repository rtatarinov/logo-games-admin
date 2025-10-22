import { sample } from "effector";

import { createEvent } from "@app/shared/effector";

import { buildFetchPlatformStatisticQuery } from "../api";

export type PlatformStatisticModel = ReturnType<typeof createPlatformStatisticModel>;

export const createPlatformStatisticModel = () => {
    const init = createEvent();
    const destroy = createEvent();
    const fetch = createEvent();

    const query = buildFetchPlatformStatisticQuery();

    const $data = query.$data;
    const $isLoading = query.$pending;

    sample({
        clock: init,
        target: fetch,
    });

    sample({
        clock: fetch,
        target: query.start,
    });

    return {
        $data,
        $isLoading,

        init,
        destroy,
    };
};
