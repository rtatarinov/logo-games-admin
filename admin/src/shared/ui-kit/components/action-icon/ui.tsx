import { forwardRef, memo } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { ActionIconProps as MantineActionIconProps } from "@mantine/core";
import { ActionIcon as MantineActionIcon, createPolymorphicComponent } from "@mantine/core";

export type ActionIconMode = "grey" | "unstyled";

export interface ActionIconProps
    extends Pick<MantineActionIconProps, "children" | "loading" | "loaderProps" | "disabled"> {
    className?: string;
    iconClassName?: string;
    mode?: ActionIconMode;
}

const classNamesByMode = {
    grey: tw.rounded.bg_light_grey.text_black.hover(tw.bg_light_grey_hover.text_black),
    unstyled: tw.rounded_none.bg_transparent.text_black.hover(tw.bg_transparent.text_green),
} as const satisfies Record<ActionIconMode, string>;

const _ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
    (
        {
            children,
            disabled,
            loading,
            loaderProps,
            className,
            iconClassName,
            mode = "unstyled",
            ...rest
        },
        ref,
    ) => {
        const updatedLoaderProps = {
            ...(loaderProps ?? {}),
            color: loaderProps?.color ?? "black",
        };

        return (
            <MantineActionIcon
                classNames={{
                    root: cx(
                        tw.w_auto.h_auto.border_none.p_2.transition_colors,
                        classNamesByMode[mode],
                        className,
                    ),
                    icon: cx(tw.w_auto.h_auto, iconClassName),
                }}
                loading={loading}
                disabled={disabled || loading}
                loaderProps={updatedLoaderProps}
                ref={ref}
                {...rest}
            >
                {children}
            </MantineActionIcon>
        );
    },
);

_ActionIcon.displayName = "ActionIcon";

export const ActionIcon = createPolymorphicComponent<"button" | "a", ActionIconProps>(
    memo(_ActionIcon),
);
