import type { RouteInstance, RouteParams } from "atomic-router";
import { sample } from "effector";

import { createPlatformStatisticModel } from "@app/modules/platform-statistic";

export type HomeModel = ReturnType<typeof createHomeModel>;

export const createHomeModel = ({ route }: { route: RouteInstance<RouteParams> }) => {
    const $$platformStatistic = createPlatformStatisticModel();

    sample({
        clock: route.opened,
        target: $$platformStatistic.init,
    });

    sample({
        clock: route.closed,
        target: $$platformStatistic.destroy,
    });

    return {
        $$platformStatistic,
    };
};
