import type { SyntheticEvent } from "react";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";

import cx from "classnames";
import { isEmpty, isNotNil } from "ramda";
import { tw } from "typewind";

import { IconCalendar } from "@tabler/icons-react";

import { useCursorPosition } from "@app/shared/hooks/useCursorPosition";
import type { TextInputProps } from "@app/shared/ui-kit/components";
import { TextInput } from "@app/shared/ui-kit/components";

import { getDateConfig, getFormattedDate, parseDateFromFormat } from "./lib";

export type DateInputProps = TextInputProps & {
    onClick?: (evt: SyntheticEvent) => void;
    withCalendar?: boolean;
};

const handleValue = (value: string) => {
    if (isEmpty(value)) {
        return "";
    }

    return getFormattedDate(value);
};

export const DateInput = forwardRef<HTMLDivElement, DateInputProps>(
    ({ value, onChange, onClick, disabled, withCalendar = true, placeholder, ...rest }, ref) => {
        const { ref: cursorRef, saveCursorPosition, restoreCursorPosition } = useCursorPosition();

        const dateConfig = getDateConfig();

        const [date, setDate] = useState(() => handleValue(value));

        const handleBlur = useCallback(() => {
            const isValidDate = isNotNil(parseDateFromFormat(date));

            if (!isValidDate) {
                setDate(handleValue(value));
            }
        }, [date, value]);

        const updateDate = useCallback(
            (value: string) => {
                if (isEmpty(value)) {
                    return onChange("");
                }

                const transformedValue = value.replaceAll(dateConfig.separator, "");
                const wasLastCharSeparator = `${value}${dateConfig.separator}` === date;

                const text = wasLastCharSeparator
                    ? value
                    : dateConfig.separatorPositions.reduce((acc, position) => {
                          if (
                              acc.length >= position &&
                              acc[position - 1] !== dateConfig.separator
                          ) {
                              return (
                                  acc.slice(0, position) +
                                  dateConfig.separator +
                                  acc.slice(position)
                              );
                          }

                          return acc;
                      }, transformedValue);

                if (dateConfig.regexp.test(text)) {
                    const currentCursorPosition = cursorRef.current?.selectionStart ?? 0;
                    const separatorWasAdded = text.length > value.length;
                    const separatorWasRestored = text.length === date.length;

                    saveCursorPosition(
                        separatorWasAdded && !separatorWasRestored
                            ? currentCursorPosition + 1
                            : currentCursorPosition,
                    );

                    setDate(text);

                    const result = parseDateFromFormat(text);

                    if (isNotNil(result)) {
                        onChange(result);
                    }
                }
            },
            [date, onChange, dateConfig, cursorRef, saveCursorPosition],
        );

        useLayoutEffect(() => {
            setDate(handleValue(value));
        }, [value]);

        useLayoutEffect(() => {
            restoreCursorPosition();
        }, [date, restoreCursorPosition]);

        return (
            <div onClick={disabled ? undefined : onClick} ref={ref}>
                <TextInput
                    value={date}
                    onBlur={handleBlur}
                    onChange={updateDate}
                    leftSection={
                        withCalendar ? (
                            <IconCalendar
                                width={20}
                                height={20}
                                className={cx({
                                    [tw.cursor_not_allowed]: disabled,
                                    [tw.cursor_pointer]: !disabled,
                                })}
                            />
                        ) : null
                    }
                    withClearButton={true}
                    placeholder={placeholder ?? dateConfig.placeholder}
                    type="tel"
                    ref={cursorRef}
                    disabled={disabled}
                    {...rest}
                />
            </div>
        );
    },
);

DateInput.displayName = "DateInput";
