import type { ReactNode } from "react";
import { useCallback, useEffect } from "react";

import { tw } from "typewind";

import { AppShell } from "@mantine/core";
import { useDisclosure, useFullscreen } from "@mantine/hooks";

import { HeaderHeightProvider } from "@app/shared/context/header-height/HeaderHeightContext";
import { log, maybeError, reasonText } from "@app/shared/lib/clilog";
import { Button, ScrollArea } from "@app/shared/ui-kit/components";
import { useTheme } from "@app/shared/ui-kit/theme";

import type { AppModel } from "../../model";
import { Header } from "./Header";
import { Navigation } from "./navigation";

export const AppLayout = ({ $$model, children }: { children: ReactNode; $$model: AppModel }) => {
    const [disabled, { open: disableAppShell, close: enableAppShell }] = useDisclosure();

    const [isOpenNavigation, { toggle: toggleNavigation, close: closeNavigation }] =
        useDisclosure(false);

    const { toggle: toggleFullscreen, fullscreen } = useFullscreen();

    const handleToggleFullscreen = useCallback(() => {
        toggleFullscreen().catch((reason) => {
            log.error(`Failed to toggle fullscreen${reasonText(reason)}`, maybeError(reason));
        });
    }, [toggleFullscreen]);

    const handleCloseNavigation = useCallback(() => {
        if (isOpenNavigation) {
            closeNavigation();
        }
    }, [closeNavigation, isOpenNavigation]);

    const NavigationScroll = useCallback(
        ({ children }: { children: ReactNode }) => (
            <ScrollArea height="100%">{children}</ScrollArea>
        ),
        [],
    );

    const theme = useTheme();

    useEffect(() => {
        if (fullscreen) {
            disableAppShell();
        } else {
            enableAppShell();
        }
    }, [disableAppShell, enableAppShell, fullscreen]);

    return (
        <HeaderHeightProvider>
            <AppShell
                header={{ height: 64 }}
                navbar={{
                    width: 324,
                    breakpoint: theme.breakpoints.lg,
                    collapsed: { mobile: !isOpenNavigation },
                }}
                disabled={disabled}
            >
                <Header
                    isOpenNavigation={isOpenNavigation}
                    onToggleNavigation={toggleNavigation}
                    $$model={$$model}
                />

                <AppShell.Navbar className={tw.border_r_light_grey}>
                    <AppShell.Section grow={true} component={NavigationScroll}>
                        <Navigation
                            onCloseNavigation={handleCloseNavigation}
                            $$session={$$model.$$session}
                        />
                    </AppShell.Section>
                </AppShell.Navbar>

                <AppShell.Main className={tw.relative.pb_16}>
                    <div className={tw.p_4.lg(tw.p_8)}>{children}</div>

                    <Button
                        className={tw.fixed.bottom_4.right_4.z_1.hidden.lg(tw.flex)}
                        onClick={handleToggleFullscreen}
                    >
                        {fullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
                    </Button>
                </AppShell.Main>
            </AppShell>
        </HeaderHeightProvider>
    );
};
