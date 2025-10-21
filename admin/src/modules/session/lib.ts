import type { RouteInstance, RouteParams, RouteParamsAndQuery } from "atomic-router";
import { chainRoute, redirect } from "atomic-router";
import { sample } from "effector";
import { condition, not } from "patronum";
import { createEvent } from "@app/shared/effector";
import { homeRoute, signInRoute } from "@app/shared/routing";

import type { SessionModel } from "./model/session";

export const chainUnauthorized = (route: RouteInstance<RouteParams>, $$session: SessionModel) => {
    const checkAuthorized = createEvent<RouteParamsAndQuery<RouteParams>>();

    const available = createEvent();
    const unavailable = createEvent();

    condition({
        source: checkAuthorized,
        if: not($$session.$isLoggedIn),
        then: available,
        else: unavailable,
    });

    sample({
        clock: $$session.$isLoggedIn,
        target: unavailable,
    });

    redirect({
        clock: unavailable,
        route: homeRoute,
    });

    return chainRoute({
        beforeOpen: checkAuthorized,
        cancelOn: [unavailable],
        openOn: [available],
        route,
    });
};

export const chainAuthorized = (route: RouteInstance<RouteParams>, $$session: SessionModel) => {
    const checkAuthorized = createEvent<RouteParamsAndQuery<RouteParams>>();
    const available = createEvent();
    const unavailable = createEvent();

    condition({
        source: checkAuthorized,
        if: $$session.$isLoggedIn,
        then: available,
        else: unavailable,
    });

    redirect({
        clock: unavailable,
        route: signInRoute,
    });

    return chainRoute({
        beforeOpen: checkAuthorized,
        cancelOn: [unavailable],
        openOn: [available],
        route,
    });
};
