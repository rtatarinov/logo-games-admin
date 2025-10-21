import { sample } from "effector";

import { createEvent } from "@app/shared/effector";

import { buildSignOutMutation } from "../api";

export type LogoutModel = ReturnType<typeof createLogoutModel>;

export const createLogoutModel = () => {
    const init = createEvent();
    const destroy = createEvent();

    const logout = createEvent();

    const logoutMutation = buildSignOutMutation();

    sample({
        clock: logout,
        target: logoutMutation.start,
    });

    sample({
        clock: logoutMutation.finished.success,
        target: destroy,
    });

    sample({
        clock: destroy,
        target: logoutMutation.reset,
    });

    return {
        init,
        destroy,
        logout,
    };
};
