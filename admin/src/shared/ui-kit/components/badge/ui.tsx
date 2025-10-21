import { forwardRef, memo } from "react";

import cx from "classnames";
import type { Except } from "type-fest";
import { tw } from "typewind";

import type { BadgeProps as MantineBadgeProps } from "@mantine/core";
import { Badge as MantineBadge, createPolymorphicComponent } from "@mantine/core";

export type BadgeColor = "green" | "orange" | "red" | "black" | "grey";
export type BadgeMode = "fill" | "outline";
export type BadgeSize = 20 | 28;

export interface BadgeProps
    extends Except<MantineBadgeProps, "size" | "color" | "radius" | "gradient" | "autoContrast"> {
    mode: BadgeMode;
    color: BadgeColor;
    size?: BadgeSize;
}

const rootClassNamesByMode = {
    fill: {
        red: tw.bg_red,
        green: tw.bg_green,
        orange: tw.bg_orange,
        black: tw.bg_black,
        grey: tw.bg_grey,
    },
    outline: {
        red: tw.border.border_solid.border_red.bg_transparent,
        green: tw.border.border_solid.border_green.bg_transparent,
        orange: tw.border.border_solid.border_orange.bg_transparent,
        black: tw.border.border_solid.border_black.bg_transparent,
        grey: tw.border.border_solid.border_grey.bg_transparent,
    },
} as const satisfies Record<BadgeMode, Record<BadgeColor, string>>;

const labelClassNamesByMode = {
    fill: {
        red: tw.text_white,
        green: tw.text_white,
        orange: tw.text_white,
        black: tw.text_white,
        grey: tw.text_white,
    },
    outline: {
        red: tw.text_red,
        green: tw.text_green,
        orange: tw.text_orange,
        black: tw.text_black,
        grey: tw.text_grey,
    },
} as const satisfies Record<BadgeMode, Record<BadgeColor, string>>;

const rootClassNamesBySize = {
    20: tw.px_2.py_["1px"],
    28: tw.px_3.py_1,
} as const satisfies Record<BadgeSize, string>;

const _Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ mode, children, className, color, size = 28, ...rest }, ref) => (
        <MantineBadge
            ref={ref}
            component="span"
            classNames={{
                root: cx(
                    tw.flex.justify_center.h_auto.transition_colors.gap_[1.5],
                    rootClassNamesBySize[size],
                    rootClassNamesByMode[mode][color],
                    className,
                ),
                label: cx(
                    tw.transform_none.normal_case.font_semibold,
                    size === 28 ? tw.text_body_14 : tw.text_body_12,
                    labelClassNamesByMode[mode][color],
                ),
                section: tw.mr_0.ml_0,
            }}
            {...rest}
        >
            {children}
        </MantineBadge>
    ),
);

_Badge.displayName = "Badge";

export const Badge = createPolymorphicComponent<"button", BadgeProps>(memo(_Badge));
