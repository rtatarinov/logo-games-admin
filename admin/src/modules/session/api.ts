import { createEffect } from "effector/effector.mjs";

import { authLogin, userCurrent, userCurrentLogout } from "@app/shared/api/generated";
import { createAppMutation, createAppQuery } from "@app/shared/api/http-client/farfetched";

export const buildSignInMutation = () => createAppMutation({ effect: createEffect(authLogin) });

export const buildSignOutMutation = () =>
    createAppMutation({ effect: createEffect(userCurrentLogout) });

export const buildFetchMeQuery = () =>
    createAppQuery({
        effect: createEffect(userCurrent),
    });
