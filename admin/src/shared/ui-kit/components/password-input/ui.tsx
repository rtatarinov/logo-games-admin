import type { ChangeEvent } from "react";
import { forwardRef, memo, useCallback, useMemo, useRef } from "react";

import cx from "classnames";
import { isNotEmpty, isNotNil } from "ramda";
import { tw } from "typewind";

import type { PasswordInputProps as MantinePasswordInputProps } from "@mantine/core";
import { createPolymorphicComponent, PasswordInput as MantinePasswordInput } from "@mantine/core";
import { useDisclosure, useMergedRef } from "@mantine/hooks";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";

import { buildInputClassName } from "../input/lib";

export interface PasswordInputProps
    extends Pick<
        MantinePasswordInputProps,
        | "disabled"
        | "leftSection"
        | "error"
        | "placeholder"
        | "autoFocus"
        | "label"
        | "description"
        | "name"
        | "required"
    > {
    value: string;
    onChange: (value: string, evt?: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    inputClassName?: string;
}

const _PasswordInput = forwardRef<HTMLDivElement, PasswordInputProps>(
    ({ value, onChange, error, className, inputClassName, leftSection, ...rest }, ref) => {
        const [visible, { toggle }] = useDisclosure(false);

        const inputRef = useRef<HTMLInputElement>(null);
        const withError = isNotNil(error) && isNotEmpty(error);

        const handleInputChange = useCallback(
            (evt: ChangeEvent<HTMLInputElement>) => {
                onChange(evt.target.value, evt);
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

        const getVisibilityIcon = useCallback(
            ({ reveal }: { reveal: boolean }) =>
                reveal ? (
                    <IconEyeOff width={20} height={20} />
                ) : (
                    <IconEyeCheck width={20} height={20} />
                ),
            [],
        );

        return (
            <MantinePasswordInput
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
                classNames={{
                    ...inputClassNames,
                    visibilityToggle: tw.text_dark_grey.mr_1.transition_colors.hover(tw.text_black),
                }}
                visibilityToggleIcon={getVisibilityIcon}
                visible={visible}
                onVisibilityChange={toggle}
                {...rest}
            />
        );
    },
);

_PasswordInput.displayName = "PasswordInput";

export const PasswordInput = createPolymorphicComponent<"div", PasswordInputProps>(
    memo(_PasswordInput),
);
