import { zodContract } from "@farfetched/zod";

import {
    statisticControllerFindPlatformStatistic,
    statisticControllerFindPlatformStatisticResponse,
} from "@app/shared/api/generated";
import { createAppQuery } from "@app/shared/api/http-client/farfetched";
import { createEffect } from "@app/shared/effector";

export const buildFetchPlatformStatisticQuery = () =>
    createAppQuery({
        effect: createEffect(statisticControllerFindPlatformStatistic),
        contract: zodContract(statisticControllerFindPlatformStatisticResponse),
    });
