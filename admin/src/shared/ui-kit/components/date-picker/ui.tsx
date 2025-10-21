import type { ReactNode } from "react";
import { forwardRef, useCallback, useLayoutEffect, useMemo, useState } from "react";

import cx from "classnames";
import { isNotNil, omit } from "ramda";
import type { Except } from "type-fest";
import { tw } from "typewind";

import { createPolymorphicComponent } from "@mantine/core";
import type { DatePickerProps as MantineDatePickerProps } from "@mantine/dates";
import { DatePicker as MantineDatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { formatToDateString, getCurrentDate } from "@app/shared/lib/date-and-time";
import { ActionIcon } from "@app/shared/ui-kit/components";
import { useTheme } from "@app/shared/ui-kit/theme";

import styles from "./DatePicker.module.css";

type BaseDatePickerProps = Except<
    MantineDatePickerProps,
    | "minDate"
    | "value"
    | "onChange"
    | "date"
    | "maxDate"
    | "allowSingleDateInRange"
    | "allowDeselect"
    | "presets"
    | "defaultValue"
    | "__onPresetSelect"
> & {
    disabledFutureDates?: boolean;
    disabledPreviousDates?: boolean;
    withClearButton?: boolean;
};

export type DateValue = string | null;

export type DefaultDatePickerProps = BaseDatePickerProps & {
    value: DateValue;
    onChange: (date: DateValue) => void;
    type: "default";
    presets?: undefined;
};

export type RangeDatePickerProps = BaseDatePickerProps & {
    value: [DateValue, DateValue];
    onChange: (date: [DateValue, DateValue]) => void;
    type: "range";
    presets?: { value: [string | null, string | null]; label: ReactNode }[];
};

export type DatePickerProps = DefaultDatePickerProps | RangeDatePickerProps;

const _DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

    const minDate = useMemo(() => {
        if (props.disabledPreviousDates) {
            return formatToDateString(getCurrentDate());
        }
    }, [props.disabledPreviousDates]);

    const maxDate = useMemo(() => {
        if (props.disabledFutureDates) {
            return formatToDateString(getCurrentDate());
        }
    }, [props.disabledFutureDates]);

    const getDayProps = useCallback(
        (date: string) => ({
            "data-today": getCurrentDate().isSame(date, "day"),
        }),
        [],
    );

    const baseProps = useMemo(
        () => ({
            ...omit(["presets", "disabledFutureDates", "disabledPreviousDates"], props),
            numberOfColumns: isMobile ? 1 : props.numberOfColumns,
            withCellSpacing: false,
            previousIcon: (
                <ActionIcon component="span" mode="grey">
                    <IconChevronLeft width={16} height={16} />
                </ActionIcon>
            ),
            nextIcon: (
                <ActionIcon component="span" mode="grey">
                    <IconChevronRight width={16} height={16} />
                </ActionIcon>
            ),
            classNames: {
                datePickerRoot: tw.flex.flex_col.gap_4.w_full.lg(tw.flex_row.gap_2.items_center),
                day: cx(tw.w_12.h_12.lg(tw.w_9.h_9), styles.day),
                weekday: tw.text_grey.font_semibold,
                monthsListControl: tw
                    .selected(tw.important(tw.bg_blue.text_white))
                    .hover(tw.bg_light_green),
                yearsListControl: tw
                    .selected(tw.important(tw.bg_blue.text_white))
                    .hover(tw.bg_light_green),
                placeholder: tw.text_dark_grey,
                presetButton: tw.text_black.font_semibold.px_["1.5"]
                    .lg(tw.px_2)
                    .hover(tw.bg_light_green),
                presetsList: tw.flex.border_transparent.m_0.w_full.pb_1.overflow_x_auto.flex_row.lg(
                    tw.border_medium_grey.flex_col.w_auto.pb_0,
                ),
                levelsGroup: tw.w_full.justify_center.lg(tw.w_auto),
                calendarHeader: tw.max_w_["unset"],
            },
        }),
        [props, isMobile],
    );

    if (props.type === "default") {
        const [date, setDate] = useState<string | undefined>(() => {
            if (isNotNil(props.value)) {
                return props.value;
            }
        });

        useLayoutEffect(() => {
            if (isNotNil(props.value)) {
                return setDate(props.value);
            }
        }, [props.value]);

        return (
            <MantineDatePicker
                {...baseProps}
                type="default"
                value={props.value}
                date={date}
                onChange={props.onChange}
                onPreviousMonth={setDate}
                onNextMonth={setDate}
                onPreviousYear={setDate}
                onNextYear={setDate}
                onMonthSelect={setDate}
                onYearSelect={setDate}
                onPreviousDecade={setDate}
                onNextDecade={setDate}
                minDate={minDate}
                maxDate={maxDate}
                presets={props.presets}
                getDayProps={getDayProps}
                ref={ref}
            />
        );
    }

    const [date, setDate] = useState<string | undefined>(() => {
        if (isNotNil(props.value[0])) {
            return props.value[0];
        }
    });

    useLayoutEffect(() => {
        if (isNotNil(props.value[0])) {
            return setDate(props.value[0]);
        }
    }, [props.value]);

    return (
        <div className={tw.flex.items_start.gap_6.flex_col.items_center.lg(tw.flex_row.gap_12)}>
            <MantineDatePicker
                {...baseProps}
                type="range"
                allowSingleDateInRange={true}
                value={props.value}
                date={date}
                onChange={props.onChange}
                onPreviousMonth={setDate}
                onNextMonth={setDate}
                onPreviousYear={setDate}
                onNextYear={setDate}
                onMonthSelect={setDate}
                onYearSelect={setDate}
                onPreviousDecade={setDate}
                onNextDecade={setDate}
                minDate={minDate}
                maxDate={maxDate}
                presets={props.presets}
                getDayProps={getDayProps}
                ref={ref}
            />
        </div>
    );
});

_DatePicker.displayName = "DatePicker";

export const DatePicker = createPolymorphicComponent<"div", DatePickerProps>(_DatePicker);
