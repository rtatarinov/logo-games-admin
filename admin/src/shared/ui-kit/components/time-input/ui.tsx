import type { SyntheticEvent } from "react";
import { forwardRef, memo, useCallback, useMemo } from "react";

import cx from "classnames";
import { isNotEmpty, isNotNil } from "ramda";
import type { Except } from "type-fest";
import { tw } from "typewind";

import { createPolymorphicComponent } from "@mantine/core";
import type { TimePickerProps as MantineTimePickerProps } from "@mantine/dates";
import { TimePicker as MantineTimePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { IconClock, IconX } from "@tabler/icons-react";

import { useTheme } from "@app/shared/ui-kit/theme";

import { ActionIcon } from "../action-icon";
import { buildInputClassName } from "../input/lib";

const addSecondsToTime = (time: string) => `${time}:00`;

export interface TimeInputProps
    extends Except<MantineTimePickerProps, "value" | "onChange" | "format"> {
    value: string;
    onChange: (time: string) => void;
    onClear?: () => void;
    withClearButton?: boolean;
    inputClassName?: string;
}

const _TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
    (
        {
            leftSection = <IconClock width={20} height={20} />,
            onChange,
            inputClassName,
            className,
            withSeconds = false,
            withDropdown = true,
            error,
            value,
            withClearButton,
            onClear,
            ...rest
        },
        ref,
    ) => {
        const withError = isNotNil(error) && isNotEmpty(error);

        const handleChange = useCallback(
            (time: string) => {
                if (withSeconds) {
                    onChange(time);
                } else {
                    onChange(addSecondsToTime(time));
                }
            },
            [withSeconds, onChange],
        );

        const resetValue = useCallback(
            (evt: SyntheticEvent<HTMLButtonElement>) => {
                evt.stopPropagation();
                onChange("");

                if (isNotNil(onClear)) {
                    onClear();
                }
            },
            [onChange, onClear],
        );

        const inputClassNames = useMemo(() => {
            const commonInputStyles = buildInputClassName({
                withError,
                withLeftSection: isNotNil(leftSection),
                className,
                inputClassName,
            });

            return {
                ...commonInputStyles,
                field: tw.focus(tw.bg_light_grey_hover.text_black),
                control: tw.active(tw.bg_blue.text_white).hover(tw.bg_light_grey_hover),
            };
        }, [className, inputClassName, leftSection, withError]);

        const theme = useTheme();
        const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

        return (
            <MantineTimePicker
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
                    (withClearButton || isNotNil(onClear)) && isNotEmpty(value) ? (
                        <ActionIcon type="button" onClick={resetValue}>
                            <IconX width={16} height={16} />
                        </ActionIcon>
                    ) : null
                }
                ref={ref}
                onChange={handleChange}
                classNames={inputClassNames}
                withSeconds={withSeconds}
                withDropdown={isMobile ? false : withDropdown}
                format="24h"
                value={value}
                {...rest}
            />
        );
    },
);

_TimeInput.displayName = "TimeInput";

export const TimeInput = createPolymorphicComponent<"input", TimeInputProps>(memo(_TimeInput));
