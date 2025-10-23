import { restore } from "effector";
import { reset } from "patronum";

import { createEvent } from "@app/shared/effector";

export type PaginationModel = ReturnType<typeof createPaginationModel>;

export const createPaginationModel = ({ page, limit }: { page: number; limit: number }) => {
    const init = createEvent();
    const destroy = createEvent();

    const changePage = createEvent<number>();
    const updateLimit = createEvent<number>();

    const $page = restore(changePage, page);
    const $limit = restore(updateLimit, limit);

    reset({
        clock: destroy,
        target: [$page, $limit],
    });

    return {
        $page,
        $limit,

        init,
        destroy,
        changePage,
        updateLimit,
    };
};
