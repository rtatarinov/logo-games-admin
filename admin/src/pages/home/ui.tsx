import { useUnit } from "effector-react";

import { Loader, PageTitle } from "@app/shared/ui-kit/components";

import type { HomeModel } from "@app/pages/home/model";

export const Home = ({ $$model }: { $$model: HomeModel }) => {
    const isLoggedIn = useUnit($$model.$$session.$isLoggedIn);

    if (!isLoggedIn) {
        return <Loader size={32} centered={true} />;
    }

    return (
        <>
            <PageTitle>Главная</PageTitle>
        </>
    );
};
