import {createHistoryRouter} from "atomic-router";
import {createRoutesView} from "atomic-router-react";
import type {SessionModel} from "@app/modules/session";

import {createLazyPage} from "@app/shared/lib/lazy-page";
import {userRoute, notFoundRoute, signInRoute,} from "@app/shared/routing";

import type {NotificationModel} from "@app/infrastructure-entities/notification-center";

export const createRouting = ({
    $$notification,
    $$session,
}: {
    $$notification: NotificationModel;
    $$session: SessionModel;
}) => {
    const routes = [
        { path: "/sign-in", route: signInRoute },
        { path: "/process/launched/:id", route: userRoute },
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
        ],
    });

    return { Pages, router };
};
