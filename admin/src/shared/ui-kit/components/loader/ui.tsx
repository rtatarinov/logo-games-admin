import { forwardRef, memo } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { LoaderProps as MantineLoaderProps } from "@mantine/core";
import { createPolymorphicComponent, Loader as MantineLoader } from "@mantine/core";

import type { Colors } from "@app/shared/ui-kit/theme";

export interface LoaderProps extends Pick<MantineLoaderProps, "children" | "type"> {
    size: number;
    color?: Colors;
    className?: string;
    centered?: boolean;
}

const _Loader = forwardRef<HTMLDivElement, LoaderProps>(
    ({ children, color = "green", className, centered, ...rest }, ref) =>
        Boolean(centered) ? (
            <div className={cx(tw.flex.justify_center.p_4.w_full, className)} ref={ref}>
                <MantineLoader color={color} className={tw.leading_none} {...rest}>
                    {children}
                </MantineLoader>
            </div>
        ) : (
            <MantineLoader
                ref={ref}
                color={color}
                className={cx(tw.leading_none, className)}
                {...rest}
            >
                {children}
            </MantineLoader>
        ),
);

_Loader.displayName = "Loader";

export const Loader = createPolymorphicComponent<"div", LoaderProps>(memo(_Loader));
