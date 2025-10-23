import { PlatformStatistic } from "@app/modules/platform-statistic";

import { PageTitle } from "@app/shared/ui-kit/components";

import type { HomeModel } from "./model";

export const Home = ({ $$model }: { $$model: HomeModel }) => (
    <>
        <PageTitle>Главная</PageTitle>
        <PlatformStatistic $$model={$$model.$$platformStatistic} />
    </>
);
