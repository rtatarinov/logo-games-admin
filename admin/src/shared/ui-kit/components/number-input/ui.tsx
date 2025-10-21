import { forwardRef, memo, useCallback, useMemo, useRef } from "react";

import cx from "classnames";
import { isNotEmpty, isNotNil } from "ramda";
import { tw } from "typewind";

import type { NumberInputProps as MantineNumberInputProps } from "@mantine/core";
import { createPolymorphicComponent, NumberInput as MantineNumberInput } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

import { ActionIcon } from "../action-icon";
import { buildInputClassName } from "../input/lib";

export interface NumberInputProps
    extends Pick<
        MantineNumberInputProps,
        | "disabled"
        | "leftSection"
        | "error"
        | "placeholder"
        | "autoFocus"
        | "label"
        | "description"
        | "name"
        | "required"
        | "allowDecimal"
        | "allowLeadingZeros"
        | "allowNegative"
        | "decimalScale"
        | "step"
        | "min"
        | "max"
    > {
    value: string;
    onChange: (value: string) => void;
    withClearButton?: boolean;
    className?: string;
    inputClassName?: string;
}

const _NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
    (
        {
            value,
            onChange,
            error,
            className,
            inputClassName,
            withClearButton,
            leftSection,
            allowNegative = false,
            ...rest
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const withError = isNotNil(error) && isNotEmpty(error);

        const focusInput = useCallback(() => {
            inputRef.current?.focus();
        }, []);

        const resetValue = useCallback(() => {
            onChange("");
            focusInput();
        }, [onChange, focusInput]);

        const handleChange = useCallback(
            (value: string | number) => {
                onChange(String(value));
            },
            [onChange],
        );

        const inputClassNames = useMemo(
            () =>
                buildInputClassName({
                    withError,
                    withLeftSection: isNotNil(leftSection),
                    className,
                    inputClassName,
                }),
            [className, inputClassName, leftSection, withError],
        );

        return (
            <MantineNumberInput
                ref={useMergedRef(inputRef, ref)}
                value={value}
                onChange={handleChange}
                error={error}
                leftSection={
                    isNotNil(leftSection) ? (
                        <div
                            className={cx(
                                tw.leading_none.cursor_text.px_2,
                                withError ? tw.text_red : tw.text_black,
                            )}
                        >
                            {leftSection}
                        </div>
                    ) : null
                }
                leftSectionProps={{ className: tw.pointer_events_none }}
                rightSection={
                    withClearButton && isNotEmpty(value) ? (
                        <ActionIcon type="button" onClick={resetValue}>
                            <IconX width={16} height={16} />
                        </ActionIcon>
                    ) : null
                }
                allowNegative={allowNegative}
                hideControls={true}
                classNames={inputClassNames}
                {...rest}
            />
        );
    },
);

_NumberInput.displayName = "NumberInput";

export const NumberInput = createPolymorphicComponent<"div", NumberInputProps>(memo(_NumberInput));
