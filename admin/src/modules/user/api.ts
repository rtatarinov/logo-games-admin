import { createEffect } from "effector/effector.mjs";

import { zodContract } from "@farfetched/zod";

import {
    tokenControllerGetUserSessionsById,
    tokenControllerGetUserSessionsByIdResponse,
    userControllerFindAll,
    userControllerGetUserById,
} from "@app/shared/api/generated";
import { createAppQuery } from "@app/shared/api/http-client/farfetched";

export const buildGetUsersQuery = () =>
    createAppQuery({ effect: createEffect(userControllerFindAll) });

export const buildGetUserQuery = () =>
    createAppQuery({ effect: createEffect(userControllerGetUserById) });

export const buildGetUserSessionsQuery = () =>
    createAppQuery({
        effect: createEffect(tokenControllerGetUserSessionsById),
        contract: zodContract(tokenControllerGetUserSessionsByIdResponse),
    });
