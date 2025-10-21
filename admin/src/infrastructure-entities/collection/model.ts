import { sample } from "effector";
import { indexBy, isNotNil, prop } from "ramda";

import type { Query } from "@farfetched/core";

import { createEvent } from "@app/shared/effector";

export const createCollectionModel = <
    Params,
    Item extends { id: string },
    Error,
    InitialData = Item[],
>({
    queryBuilder,
}: {
    queryBuilder: () => Query<Params, Item[], Error, InitialData>;
}) => {
    const init = createEvent<Params>();
    const destroy = createEvent();

    const fetch = createEvent<Params>();

    const query = queryBuilder();
    const $data = query.$data.map((data) => (Array.isArray(data) ? data : []));
    const $isEmpty = $data.map((data) => isNotNil(data) && data.length === 0);
    const $dataById = $data.map(indexBy(prop("id")));

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
        $data,
        $dataById,
        $isLoading: query.$pending,
        $isEmpty,

        query,

        init,
        destroy,
        fetch,
    };
};
