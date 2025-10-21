import { Fragment, Suspense } from "react";

import { RouterProvider } from "atomic-router-react";
import cx from "classnames";
import { useUnit } from "effector-react";
import { tw } from "typewind";

import { SessionGuard } from "@app/modules/session";

import { Loader } from "@app/shared/ui-kit/components";
import { ThemeProvider } from "@app/shared/ui-kit/theme";

import { NotificationCenter } from "@app/infrastructure-entities/notification-center";

import type { AppModel } from "../model";
import { AppLayout } from "./_layout";

export const App = ({ $$model }: { $$model: AppModel }) => {
    const [isAppLayoutHidden, isSessionFreeRoute] = useUnit([
        $$model.$isAppLayoutHidden,
        $$model.$isSessionFreeRoute,
    ]);

    const { Pages, router } = $$model;

    const SessionWrapper = isSessionFreeRoute ? Fragment : SessionGuard;
    const AppWrapper = isAppLayoutHidden ? Fragment : AppLayout;

    return (
        <ThemeProvider theme="light" datesSettings={{ locale: "ru" }}>
            <RouterProvider router={router}>
                <SessionWrapper $$session={$$model.$$session}>
                    <AppWrapper $$model={$$model}>
                        <Suspense
                            fallback={
                                <Loader
                                    size={32}
                                    centered={true}
                                    className={cx(isAppLayoutHidden && tw.h_screen.items_center)}
                                />
                            }
                        >
                            <Pages />
                        </Suspense>
                    </AppWrapper>
                </SessionWrapper>
            </RouterProvider>

            <NotificationCenter />
        </ThemeProvider>
    );
};
