import type { ReactNode } from "react";
import { memo, useContext } from "react";

import cx from "classnames";
import { tw } from "typewind";

import { Drawer, Popover as MantinePopover } from "@mantine/core";
import { useHotkeys, useMediaQuery } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

import { noop } from "@app/shared/lib/noop";

import { useTheme } from "../../theme";
import { ActionIcon } from "../action-icon";
import { PopoverContext } from "./context";
import type { PopoverDrawerProps, PopoverPopoverProps } from "./types";

export interface PopoverProps {
    children: ReactNode;
    opened: boolean;
    onClose: () => void;
    required?: boolean;
    error?: ReactNode;
    popoverProps?: PopoverPopoverProps;
    drawerProps?: PopoverDrawerProps;
    disabled?: boolean;
}

const _Popover = ({
    opened,
    onClose,
    popoverProps = {},
    drawerProps,
    children,
    error,
    required,
    disabled,
}: PopoverProps) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

    const props = {
        offset: 8,
        middlewares: { flip: false, shift: false },
        ...popoverProps,
    };

    useHotkeys([["escape", popoverProps?.closeOnEscape || isLargeScreen ? onClose : noop]]);

    return (
        <PopoverContext.Provider
            value={{
                opened,
                onClose,
                drawerProps,
                error,
                required: Boolean(required),
                disabled: Boolean(disabled),
            }}
        >
            <MantinePopover
                opened={opened}
                onDismiss={popoverProps?.closeOnClickOutside || isLargeScreen ? onClose : noop}
                classNames={{
                    dropdown:
                        tw.rounded_none.p_0.border.border_solid.border_medium_grey.bg_white.px_[
                            "2.5"
                        ].py_2,
                }}
                {...props}
            >
                {children}
            </MantinePopover>
        </PopoverContext.Provider>
    );
};

export interface PopoverDropdownProps {
    children: ReactNode;
    className?: string;
}

const _Dropdown = ({ children, className }: PopoverDropdownProps) => {
    const { opened, onClose, drawerProps } = useContext(PopoverContext);

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

    return (
        <>
            {isLargeScreen && (
                <MantinePopover.Dropdown className={className}>{children}</MantinePopover.Dropdown>
            )}

            {!isLargeScreen && (
                <Drawer
                    opened={opened}
                    onClose={onClose}
                    classNames={{
                        root: cx(tw.lg(tw.hidden), className),
                        content: tw.px_4.pb_4.bg_white.border_none.rounded_none,
                        body: tw.p_0,
                    }}
                    position="bottom"
                    withCloseButton={false}
                    {...drawerProps}
                    title={null}
                >
                    <div
                        className={
                            tw.flex.gap_4.justify_between.items_center.sticky.top_0.bg_white.py_4
                                .z_2
                        }
                    >
                        <div className={tw.text_h4.font_semibold}>{drawerProps?.title}</div>

                        <ActionIcon type="button" onClick={onClose}>
                            <IconX width={20} height={20} />
                        </ActionIcon>
                    </div>

                    <div className={tw.flex.flex_col}>{children}</div>
                </Drawer>
            )}
        </>
    );
};

export const Popover = Object.assign(memo(_Popover), {
    Target: memo(MantinePopover.Target),
    Dropdown: memo(_Dropdown),
});
