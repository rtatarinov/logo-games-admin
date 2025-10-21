import type { RouteInstance, RouteParams } from "atomic-router";
import { sample } from "effector";

import { chainUnauthorized, createSignInModel, type SessionModel } from "@app/modules/session";

import type { NotificationModel } from "@app/infrastructure-entities/notification-center";

import { createPageMetaModel } from "../_metadata";

export type SignInPageModel = ReturnType<typeof createSignInPageModel>;

export const createSignInPageModel = ({
    $$session,
    $$notification,
    route,
}: {
    $$session: SessionModel;
    $$notification: NotificationModel;
    route: RouteInstance<RouteParams>;
}) => {
    const $$pageMeta = createPageMetaModel();
    const $$signIn = createSignInModel();

    chainUnauthorized(route, $$session);

    sample({
        clock: route.opened,
        fn: () => ({ title: "Войти в Logo-games" }),
        target: [$$pageMeta.init],
    });

    sample({
        clock: route.closed,
        target: [$$pageMeta.destroy],
    });

    return {
        $$notification,
        $$signIn,
    };
};
