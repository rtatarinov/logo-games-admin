import type { RouteInstance, RouteParams } from "atomic-router";
import { sample } from "effector";

import type { SessionModel } from "@app/modules/session";

export type HomeModel = ReturnType<typeof createHomeModel>;

export const createHomeModel = ({
    $$session,
    route,
}: {
    $$session: SessionModel;
    route: RouteInstance<RouteParams>;
}) => {
    sample({
        clock: route.opened,
        target: $$session.fetchMe,
    });

    return {
        $$session,
    };
};
