import type { RouteInstance } from "atomic-router";
import { sample } from "effector";

import { createUserCardModel, createUserSessionsModel } from "@app/modules/user";

export type UserCardModel = ReturnType<typeof createUserCardPageModel>;

export const createUserCardPageModel = ({ route }: { route: RouteInstance<{ id: string }> }) => {
    const $$userCard = createUserCardModel();
    const $$userSessions = createUserSessionsModel();

    sample({
        clock: route.opened,
        fn: (payload) => ({ id: payload.params.id }),
        target: $$userCard.init,
    });

    sample({
        clock: route.opened,
        fn: (payload) => ({ userId: payload.params.id }),
        target: $$userSessions.init,
    });

    sample({
        clock: route.closed,
        target: $$userCard.destroy,
    });

    return {
        $$userCard,
        $$userSessions,
    };
};
