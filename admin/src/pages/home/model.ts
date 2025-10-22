import type { RouteInstance, RouteParams } from "atomic-router";
import { sample } from "effector";

import { createPlatformStatisticModel } from "@app/modules/platform-statistic";
import type { SessionModel } from "@app/modules/session";

export type HomeModel = ReturnType<typeof createHomeModel>;

export const createHomeModel = ({
    $$session,
    route,
}: {
    $$session: SessionModel;
    route: RouteInstance<RouteParams>;
}) => {
    const $$platformStatistic = createPlatformStatisticModel();

    sample({
        clock: route.opened,
        target: [$$session.fetchMe, $$platformStatistic.init],
    });

    return {
        $$session,
        $$platformStatistic,
    };
};
