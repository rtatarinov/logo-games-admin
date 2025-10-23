import type { RouteInstance, RouteParams } from "atomic-router";
import { sample } from "effector";

import { createUsersListModel } from "@app/modules/user";

export type UsersModel = ReturnType<typeof createUsersModel>;

export const createUsersModel = ({ route }: { route: RouteInstance<RouteParams> }) => {
    const $$users = createUsersListModel();

    sample({
        clock: route.opened,
        target: $$users.init,
    });

    sample({
        clock: route.closed,
        target: $$users.destroy,
    });

    return {
        $$users,
    };
};
