import type { ReactNode } from "react";
import { forwardRef, memo, useMemo } from "react";

import { tw } from "typewind";

import type { ScrollAreaAutosizeProps as MantineScrollAreaAutoSizeProps } from "@mantine/core";
import { createPolymorphicComponent, ScrollArea as MantineScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { useTheme } from "@app/shared/ui-kit/theme";

export interface ScrollAreaProps
    extends Pick<
        MantineScrollAreaAutoSizeProps,
        | "scrollbarSize"
        | "type"
        | "onTopReached"
        | "onBottomReached"
        | "onScrollPositionChange"
        | "scrollHideDelay"
    > {
    children: ReactNode;
    height: string | number;
    disableOnMobile?: boolean;
    className?: string;
}

const _ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
    (
        { children, scrollbarSize = 8, type = "auto", height, disableOnMobile = true, ...rest },
        ref,
    ) => {
        const theme = useTheme();
        const isLargeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

        const mah = useMemo(() => {
            if (disableOnMobile) {
                return isLargeScreen ? height : "auto";
            }

            return height;
        }, [disableOnMobile, height, isLargeScreen]);

        return (
            <MantineScrollArea.Autosize
                ref={ref}
                scrollbarSize={scrollbarSize}
                type={type}
                mah={mah}
                offsetScrollbars="present"
                classNames={{ viewport: tw.overscroll_contain }}
                {...rest}
            >
                {children}
            </MantineScrollArea.Autosize>
        );
    },
);

_ScrollArea.displayName = "ScrollArea";

export const ScrollArea = createPolymorphicComponent<"div", ScrollAreaProps>(memo(_ScrollArea));
