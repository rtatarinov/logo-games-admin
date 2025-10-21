import { forwardRef, memo } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { LoadingOverlayProps as MantineLoadingOverlayProps } from "@mantine/core";
import { createPolymorphicComponent, LoadingOverlay as MantineLoadingOverlay } from "@mantine/core";

import type { Colors } from "@app/shared/ui-kit/theme";

export interface LoadingOverlayProps
    extends Pick<MantineLoadingOverlayProps, "loaderProps" | "overlayProps"> {
    visible: boolean;
    size?: number;
    color?: Colors;
    className?: string;
}

const _LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
    ({ color = "green", size = 32, className, loaderProps = {}, ...rest }, ref) => {
        const defaultLoaderProps = {
            color,
            size,
            type: "dots",
        };

        return (
            <MantineLoadingOverlay
                ref={ref}
                color={color}
                className={cx(tw.leading_none, className)}
                zIndex={1}
                loaderProps={{ ...defaultLoaderProps, ...loaderProps }}
                {...rest}
            />
        );
    },
);

_LoadingOverlay.displayName = "Loader";

export const LoadingOverlay = createPolymorphicComponent<"div", LoadingOverlayProps>(
    memo(_LoadingOverlay),
);
