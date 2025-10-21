import { useLayoutEffect } from "react";

import { Link } from "atomic-router-react";
import { tw } from "typewind";

import { ProfileAction } from "@app/modules/session";
import { AppShell, Burger } from "@mantine/core";
import { useElementSize, useMediaQuery } from "@mantine/hooks";

import { useHeaderHeightCtx } from "@app/shared/context/header-height/HeaderHeightContext";
import { homeRoute } from "@app/shared/routing";
import { Logo } from "@app/shared/ui-kit/components";
import { useTheme } from "@app/shared/ui-kit/theme";

import type { AppModel } from "../../model";

type HeaderProps = {
    isOpenNavigation: boolean;
    onToggleNavigation: () => void;
    $$model: AppModel;
};

export const Header = ({ onToggleNavigation, isOpenNavigation, $$model }: HeaderProps) => {
    const { ref, height } = useElementSize();
    const { setHeaderHeight } = useHeaderHeightCtx();

    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

    useLayoutEffect(() => {
        setHeaderHeight(height);
    }, [height, setHeaderHeight]);

    return (
        <AppShell.Header ref={ref}>
            <div
                className={tw.flex.items_center.justify_between.px_4.h_full.py_2.border_b_light_grey.md(
                    tw.px_6,
                )}
            >
                <div className={tw.flex.items_center.gap_2}>
                    <Burger
                        className={tw.lg(tw.hidden)}
                        opened={isOpenNavigation}
                        onClick={onToggleNavigation}
                        size={22}
                    />

                    <Link to={homeRoute} className={tw.leading_none}>
                        <Logo
                            mode="full"
                            width={isMobile ? 180 : 284}
                            height={isMobile ? 41 : 65}
                            className={tw.md(tw.block)}
                        />
                    </Link>
                </div>

                <div className={tw.flex.gap_2.items_center.md(tw.gap_4).lg(tw.gap_8)}>
                    <ProfileAction $$model={$$model.$$session} />
                </div>
            </div>
        </AppShell.Header>
    );
};
