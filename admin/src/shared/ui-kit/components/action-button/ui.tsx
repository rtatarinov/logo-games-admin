import type { ReactNode } from "react";

import cx from "classnames";
import type { Except } from "type-fest";
import { tw } from "typewind";

import { createPolymorphicComponent } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { ButtonProps } from "../button";
import { Button } from "../button";
import type { PopoverProps } from "../popover";
import { Popover } from "../popover";

export interface ActionButtonProps extends Except<PopoverProps, "opened" | "onClose"> {
    children: ReactNode;
    label: ReactNode;
    leftSection?: ReactNode;
    dropdownClassName?: string;
    targetClassName?: string;
    buttonProps?: ButtonProps;
}

const _ActionButton = ({
    label,
    leftSection,
    children,
    targetClassName,
    dropdownClassName,
    buttonProps,
    ...rest
}: ActionButtonProps) => {
    const [opened, { toggle, close }] = useDisclosure();

    return (
        <Popover opened={opened} onClose={close} {...rest}>
            <Popover.Target>
                <Button
                    leftSection={leftSection}
                    type="button"
                    onClick={toggle}
                    className={targetClassName}
                    {...buttonProps}
                >
                    {label}
                </Button>
            </Popover.Target>

            <Popover.Dropdown
                className={cx(tw.flex.flex_col.border.important(tw.rounded), dropdownClassName)}
            >
                {children}
            </Popover.Dropdown>
        </Popover>
    );
};

export const ActionButton = createPolymorphicComponent<"button", ActionButtonProps>(_ActionButton);
