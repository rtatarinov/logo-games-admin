import { createEffect } from "effector/effector.mjs";

import { userControllerFindAll } from "@app/shared/api/generated";
import { createAppQuery } from "@app/shared/api/http-client/farfetched";

export const buildGetUsersQuery = () =>
    createAppQuery({ effect: createEffect(userControllerFindAll) });
