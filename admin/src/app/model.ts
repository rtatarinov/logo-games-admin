import { combine, sample } from "effector";
import { createBrowserHistory } from "history";

import { createSessionModel } from "@app/modules/session";

import { createEvent } from "@app/shared/effector";
import { homeRoute, signInRoute } from "@app/shared/routing";

import { createNotificationModel } from "@app/infrastructure-entities/notification-center";

import { createRouting } from "@app/pages";

import { createHandleApiErrorsModel } from "@app/processes/handle-api-errors";
import { launchListenHistoryModel } from "@app/processes/listen-history";

export type AppModel = ReturnType<typeof createAppModel>;

export const createAppModel = () => {
    const appStarted = createEvent();

    const history = createBrowserHistory();

    const $$notification = createNotificationModel();
    const $$session = createSessionModel();

    createHandleApiErrorsModel({ $$notification, $$session });

    const { Pages, router } = createRouting({ $$notification, $$session });

    const $isAppLayoutHidden = combine(
        signInRoute.$isOpened,
        homeRoute.$isOpened,
        (signInRoute, homeRoute) => [signInRoute, homeRoute].some(Boolean),
    );

    const $isSessionFreeRoute = combine(signInRoute.$isOpened, (signInRoute) =>
        [signInRoute].some(Boolean),
    );

    const init = () => {
        router.setHistory(history);
        launchListenHistoryModel({ history });
        appStarted();
    };

    sample({
        clock: appStarted,
        target: $$session.fetchMe,
    });

    return {
        $$session,

        $isAppLayoutHidden,
        $isSessionFreeRoute,

        Pages,

        init,
        router,
    };
};
