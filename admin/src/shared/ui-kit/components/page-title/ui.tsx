import type { ReactNode } from "react";
import { memo } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { BoxProps } from "@mantine/core";
import { Box } from "@mantine/core";

export interface PageTitleProps extends BoxProps {
    children: ReactNode;
}

const _PageTitle = ({ children, className, ...rest }: PageTitleProps) => (
    <Box
        component="h1"
        className={cx(tw.text_h2.font_bold.pb_4.m_0.lg(tw.text_h1.pb_8), className)}
        {...rest}
    >
        {children}
    </Box>
);

export const PageTitle = memo(_PageTitle);
