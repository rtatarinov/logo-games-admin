import type { ReactNode } from "react";
import { memo } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { HoverCardProps as MantineHoverCardProps } from "@mantine/core";
import { HoverCard as MantineHoverCard } from "@mantine/core";

export interface HoverCardProps
    extends Pick<
        MantineHoverCardProps,
        | "closeOnClickOutside"
        | "closeOnEscape"
        | "defaultOpened"
        | "disabled"
        | "width"
        | "floatingStrategy"
        | "id"
        | "keepMounted"
        | "offset"
        | "onPositionChange"
        | "portalProps"
        | "position"
        | "positionDependencies"
        | "returnFocus"
        | "transitionProps"
        | "trapFocus"
        | "withinPortal"
        | "zIndex"
        | "onOpen"
        | "onClose"
    > {
    children: ReactNode;
}

export interface HoverCardDropdownProps {
    children: ReactNode;
    className?: string;
}

const _HoverCard = ({ children, ...rest }: HoverCardProps) => (
    <MantineHoverCard {...rest}>{children}</MantineHoverCard>
);

const _Dropdown = ({ children, className }: HoverCardDropdownProps) => (
    <MantineHoverCard.Dropdown className={cx(tw.border_medium_grey.rounded, className)}>
        {children}
    </MantineHoverCard.Dropdown>
);

export const HoverCard = Object.assign(memo(_HoverCard), {
    Target: MantineHoverCard.Target,
    Dropdown: memo(_Dropdown),
});
