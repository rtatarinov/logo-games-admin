import type { ReactNode } from "react";
import { forwardRef } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { BoxProps } from "@mantine/core";
import { Box, createPolymorphicComponent } from "@mantine/core";

export interface HighlightedInfoProps extends BoxProps {
    children: ReactNode;
    label: ReactNode;
    icon: ReactNode;
}

const _HighlightedInfo = forwardRef<HTMLDivElement, HighlightedInfoProps>(
    ({ children, className, icon, label, ...rest }, ref) => (
        <Box
            className={cx(tw.p_3.flex.items_center.gap_1.text_body_20.flex_wrap, className)}
            ref={ref}
            {...rest}
        >
            <div className={tw.flex.items_center.gap_2.text_red.flex_wrap}>
                {icon}
                <span className={tw.text_red.font_semibold}>{label}</span>
            </div>

            <div>{children}</div>
        </Box>
    ),
);

_HighlightedInfo.displayName = "HighlightedInfo";

export const HighlightedInfo = createPolymorphicComponent<"div", HighlightedInfoProps>(
    _HighlightedInfo,
);
