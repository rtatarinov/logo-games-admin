import { forwardRef, memo, useCallback } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { CheckboxProps as MantineCheckboxProps } from "@mantine/core";
import { Checkbox as MantineCheckbox, createPolymorphicComponent } from "@mantine/core";

export interface CheckboxProps
    extends Pick<MantineCheckboxProps, "checked" | "label" | "className"> {
    checked: boolean;
    onChange: (value: boolean) => void;
    labelClassName?: string;
}

const _Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ checked, onChange, className, labelClassName, ...rest }, ref) => {
        const toggleCheckbox = useCallback(() => {
            onChange(!checked);
        }, [checked, onChange]);

        return (
            <MantineCheckbox
                ref={ref}
                classNames={{
                    root: className,
                    body: tw.items_center,
                    label: cx(tw.text_body_16.select_none.cursor_pointer, labelClassName),
                    inner: tw.w_auto.h_auto,
                    input: tw.w_6.h_6.cursor_pointer.checked(tw.bg_green),
                }}
                checked={checked}
                onChange={toggleCheckbox}
                {...rest}
            />
        );
    },
);

_Checkbox.displayName = "Checkbox";

export const Checkbox = createPolymorphicComponent<"input", CheckboxProps>(memo(_Checkbox));
