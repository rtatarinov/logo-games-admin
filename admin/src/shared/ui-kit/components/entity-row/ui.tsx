import type { ReactNode } from "react";
import { forwardRef, memo } from "react";

import cx from "classnames";
import { isNotNil } from "ramda";
import { tw } from "typewind";

import type { BoxProps } from "@mantine/core";
import { Box, createPolymorphicComponent } from "@mantine/core";

export interface EntityRowProps extends Pick<BoxProps, "className" | "style"> {
    title: ReactNode;
    children?: ReactNode;
    actions?: ReactNode;
    className?: string;
}

const _EntityRow = forwardRef<HTMLDivElement, EntityRowProps>(
    ({ children, title, className, actions, ...rest }, ref) => (
        <Box ref={ref} component="div" className={cx(tw.flex.flex_col.gap_2, className)} {...rest}>
            <div className={tw.flex.gap_6.items_start.justify_between.lg(tw.items_center)}>
                <div className={tw.text_h4.font_semibold.lg(tw.text_h3)}>{title}</div>
                {isNotNil(actions) && <div className={tw.flex.gap_2}>{actions}</div>}
            </div>

            {children && <div className={tw.text_body_14.text_grey}>{children}</div>}
        </Box>
    ),
);

_EntityRow.displayName = "EntityRow";

export const EntityRow = createPolymorphicComponent<"div", EntityRowProps>(memo(_EntityRow));
