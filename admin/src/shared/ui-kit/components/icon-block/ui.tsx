import type { ReactNode } from "react";
import { forwardRef, memo } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { BoxProps } from "@mantine/core";
import { Box, createPolymorphicComponent } from "@mantine/core";

export interface IconBlockProps extends Pick<BoxProps, "className" | "style"> {
    children: ReactNode;
    className?: string;
}

const _IconBlock = forwardRef<HTMLSpanElement, IconBlockProps>(
    ({ children, className, ...rest }, ref) => (
        <Box
            ref={ref}
            component="span"
            className={cx(
                tw.inline_flex.justify_center.items_center.w_8.h_8.bg_light_grey.rounded.text_black,
                className,
            )}
            {...rest}
        >
            {children}
        </Box>
    ),
);

_IconBlock.displayName = "IconBlock";

export const IconBlock = createPolymorphicComponent<"span", IconBlockProps>(memo(_IconBlock));
