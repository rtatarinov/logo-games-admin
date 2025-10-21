import { forwardRef, memo } from "react";

import cx from "classnames";
import type { Except } from "type-fest";
import { tw } from "typewind";

import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import { Button as MantineButton, createPolymorphicComponent } from "@mantine/core";

export type ButtonColor = "green" | "black" | "orange" | "red";
export type ButtonMode = "fill" | "outline" | "link" | "light";

export interface ButtonProps
    extends Except<
        MantineButtonProps,
        "size" | "color" | "radius" | "gradient" | "justify" | "autoContrast"
    > {
    onClick?: () => void;
    mode?: ButtonMode;
    color?: ButtonColor;
}

const rootClassNamesByMode = {
    fill: {
        green: tw.border_none.bg_green.px_4.py_2.hover_or_active(tw.bg_green_hover),
        black: tw.border_none.bg_black.px_4.py_2.hover_or_active(tw.bg_dark_grey),
        orange: tw.border_none.bg_orange.px_4.py_2.hover_or_active(tw.bg_orange_hover),
        red: tw.border_none.bg_red.px_4.py_2.hover_or_active(tw.bg_orange_hover),
    },
    outline: {
        green: tw.border.border_solid.px_4.py_["1.5"].border_green.bg_transparent.hover_or_active(
            tw.bg_light_grey,
        ),
        black: tw.border.border_solid.px_4.py_["1.5"].border_black.bg_transparent.hover_or_active(
            tw.bg_light_grey,
        ),
        orange: tw.border.border_solid.px_4.py_["1.5"].border_orange.bg_transparent.hover_or_active(
            tw.bg_light_grey,
        ),
        red: tw.border.border_solid.px_4.py_["1.5"].border_red.bg_transparent.hover_or_active(
            tw.bg_light_grey,
        ),
    },
    link: {
        green: tw.px_1.bg_transparent.hover(tw.bg_transparent),
        black: tw.px_1.bg_transparent.hover(tw.bg_transparent),
        orange: tw.px_1.bg_transparent.hover(tw.bg_transparent),
        red: tw.px_1.bg_transparent.hover(tw.bg_transparent),
    },
    light: {
        green: tw.px_4.py_["1.5"].bg_transparent.hover_or_active(tw.bg_light_grey),
        black: tw.px_4.py_["1.5"].bg_transparent.hover_or_active(tw.bg_light_grey),
        orange: tw.px_4.py_["1.5"].bg_transparent.hover_or_active(tw.bg_light_grey),
        red: tw.px_4.py_["1.5"].bg_transparent.hover_or_active(tw.bg_light_grey),
    },
} as const satisfies Record<ButtonMode, Record<ButtonColor, string>>;

const textClassNamesByMode = {
    fill: {
        green: tw.text_white,
        black: tw.text_white,
        orange: tw.text_white,
        red: tw.text_white,
    },
    outline: {
        green: tw.text_green,
        black: tw.text_black,
        orange: tw.text_orange,
        red: tw.text_red,
    },
    link: {
        green: tw.text_green.underline.hover(tw.no_underline),
        black: tw.text_black.underline.hover(tw.no_underline),
        orange: tw.text_orange.underline.hover(tw.no_underline),
        red: tw.text_red.underline.hover(tw.no_underline),
    },
    light: {
        green: tw.text_green,
        black: tw.text_black,
        orange: tw.text_orange,
        red: tw.text_red,
    },
} as const satisfies Record<ButtonMode, Record<ButtonColor, string>>;

const _Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ mode = "fill", children, color = "green", className, ...rest }, ref) => (
        <MantineButton
            ref={ref}
            classNames={{
                root: cx(
                    tw.flex.justify_center.h_auto.transition_colors,
                    rootClassNamesByMode[mode][color],
                    tw.disabled(tw.opacity_50.pointer_events_none),
                    className,
                ),
                label: cx(tw.text_body_16.font_semibold, textClassNamesByMode[mode][color]),
                section: textClassNamesByMode[mode][color],
            }}
            type="button"
            {...rest}
        >
            {children}
        </MantineButton>
    ),
);

_Button.displayName = "Button";

export const Button = createPolymorphicComponent<"button", ButtonProps>(memo(_Button));
