import { combine, sample } from "effector";
import { empty, not } from "patronum";

import { createEffect, createEvent } from "@app/shared/effector";

import { buildFetchMeQuery } from "../api";
import { createLogoutModel } from "./logout";

export type SessionModel = ReturnType<typeof createSessionModel>;

export const createSessionModel = () => {
    const init = createEvent();
    const destroy = createEvent();

    const fetchMe = createEvent();

    const fetchMeQuery = buildFetchMeQuery();

    const $$logout = createLogoutModel();

    const $me = fetchMeQuery.$data;
    const $isSessionInitializing = fetchMeQuery.$pending;
    const $isLoggedIn = not(empty($me));
    const $name = $me.map((me) => me?.name ?? null);

    const $canFetchUser = combine(
        $isLoggedIn,
        $isSessionInitializing,
        (isLoggedIn, isSessionInitializing) => !isSessionInitializing && !isLoggedIn,
    );

    const destroySessionFx = createEffect(() => {
        // This is an intentional use of `window` to forcefully reset all model states
        window.location.href = "/sign-in";
    });

    sample({
        clock: fetchMe,
        filter: $canFetchUser,
        target: fetchMeQuery.start,
    });

    sample({
        clock: $$logout.destroy,
        target: destroy,
    });

    sample({
        clock: destroy,
        target: [destroySessionFx, fetchMeQuery.reset],
    });

    return {
        $$logout,

        $me,
        $isSessionInitializing,
        $isSessionFailed: fetchMeQuery.$failed,
        $isLoggedIn,
        $name,

        fetchMeQuery,

        init,
        destroy,
        fetchMe,
    };
};
