import type {
    DrawerProps as MantineDrawerProps,
    PopoverProps as MantinePopoverProps,
} from "@mantine/core";

export type PopoverDrawerProps = Pick<
    MantineDrawerProps,
    | "closeOnClickOutside"
    | "closeOnEscape"
    | "id"
    | "keepMounted"
    | "offset"
    | "returnFocus"
    | "title"
    | "trapFocus"
    | "withinPortal"
    | "zIndex"
    | "size"
>;

export type PopoverPopoverProps = Pick<
    MantinePopoverProps,
    | "width"
    | "closeOnClickOutside"
    | "closeOnEscape"
    | "offset"
    | "clickOutsideEvents"
    | "disabled"
    | "defaultOpened"
    | "floatingStrategy"
    | "id"
    | "keepMounted"
    | "position"
    | "onPositionChange"
    | "positionDependencies"
    | "returnFocus"
    | "transitionProps"
    | "trapFocus"
    | "withinPortal"
    | "zIndex"
>;
