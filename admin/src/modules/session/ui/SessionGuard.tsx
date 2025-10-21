import type { ReactNode } from "react";

import { useUnit } from "effector-react";
import { tw } from "typewind";

import { Loader } from "@app/shared/ui-kit/components";

import type { SessionModel } from "../model/session";

export const SessionGuard = ({
    $$session,
    children,
}: {
    $$session: SessionModel;
    children: ReactNode;
}) => {
    const [isSessionInitializing, isLoggedIn, isLoadingSettings] = useUnit([
        $$session.$isSessionInitializing,
        $$session.$isLoggedIn,
        $$session.$isSessionFailed,
    ]);

    if (isSessionInitializing || isLoadingSettings) {
        return (
            <div className={tw.h_screen.flex.justify_center.items_center}>
                <Loader size={32} />
            </div>
        );
    }

    return <>{isLoggedIn ? children : null}</>;
};
