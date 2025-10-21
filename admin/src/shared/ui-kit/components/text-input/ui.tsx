import type { ChangeEvent } from "react";
import { forwardRef, memo, useCallback, useMemo, useRef } from "react";

import cx from "classnames";
import { isNotEmpty, isNotNil } from "ramda";
import { tw } from "typewind";

import type { TextInputProps as MantineTextInputProps } from "@mantine/core";
import { createPolymorphicComponent, TextInput as MantineTextInput } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

import { ActionIcon } from "../action-icon";
import { buildInputClassName } from "../input/lib";

export interface TextInputProps
    extends Pick<
        MantineTextInputProps,
        | "disabled"
        | "leftSection"
        | "error"
        | "placeholder"
        | "autoFocus"
        | "label"
        | "description"
        | "name"
        | "required"
        | "type"
        | "onBlur"
        | "readOnly"
    > {
    value: string;
    onChange: (value: string, evt?: ChangeEvent<HTMLInputElement>) => void;
    withClearButton?: boolean;
    className?: string;
    inputClassName?: string;
}

const _TextInput = forwardRef<HTMLDivElement, TextInputProps>(
    (
        {
            value,
            onChange,
            error,
            className,
            inputClassName,
            withClearButton,
            leftSection,
            ...rest
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const withError = isNotNil(error) && isNotEmpty(error);

        const handleInputChange = useCallback(
            (evt: ChangeEvent<HTMLInputElement>) => {
                onChange(evt.target.value, evt);
            },
            [onChange],
        );

        const focusInput = useCallback(() => {
            inputRef.current?.focus();
        }, []);

        const resetValue = useCallback(() => {
            onChange("");
            focusInput();
        }, [onChange, focusInput]);

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
            <MantineTextInput
                ref={useMergedRef(inputRef, ref)}
                value={value}
                onChange={handleInputChange}
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
                        <ActionIcon type="button" onClick={resetValue} className={tw.relative.z_1}>
                            <IconX width={16} height={16} />
                        </ActionIcon>
                    ) : null
                }
                classNames={inputClassNames}
                {...rest}
            />
        );
    },
);

_TextInput.displayName = "TextInput";

export const TextInput = createPolymorphicComponent<"div", TextInputProps>(memo(_TextInput));
