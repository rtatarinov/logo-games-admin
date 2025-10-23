import { createHistoryRouter } from "atomic-router";
import { createRoutesView } from "atomic-router-react";

import type { SessionModel } from "@app/modules/session";

import { createLazyPage } from "@app/shared/lib/lazy-page";
import { homeRoute, notFoundRoute, signInRoute, userRoute, usersRoute } from "@app/shared/routing";

import type { NotificationModel } from "@app/infrastructure-entities/notification-center";

export const createRouting = ({
    $$notification,
    $$session,
}: {
    $$notification: NotificationModel;
    $$session: SessionModel;
}) => {
    const routes = [
        { path: "/", route: homeRoute },
        { path: "/sign-in", route: signInRoute },
        { path: "/users", route: usersRoute },
        { path: "/users/:id", route: userRoute },
    ];

    const router = createHistoryRouter({ notFoundRoute, routes });

    const Pages = createRoutesView({
        otherwise() {
            return <div>Страница не найдена</div>;
        },
        routes: [
            { route: notFoundRoute, view: () => <div>Страница не найдена</div> },
            {
                route: signInRoute,
                view: createLazyPage(
                    signInRoute,
                    { $$notification, $$session },
                    () => import("./sign-in"),
                ),
            },
            {
                route: homeRoute,
                view: createLazyPage(
                    homeRoute,
                    { $$notification, $$session },
                    () => import("./home"),
                ),
            },
            {
                route: usersRoute,
                view: createLazyPage(
                    usersRoute,
                    { $$notification, $$session },
                    () => import("./users"),
                ),
            },
        ],
    });

    return { Pages, router };
};
