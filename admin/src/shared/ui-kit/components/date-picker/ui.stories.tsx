import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
    formatToDateString,
    getBaseCalendarPresets,
    getCurrentDate,
} from "@app/shared/lib/date-and-time";

import type { DefaultDatePickerProps, RangeDatePickerProps } from "./ui";
import { DatePicker as DatePickerComponent } from "./ui";

const meta: Meta<typeof DatePickerComponent> = {
    title: "Dates/DatePicker",
    component: DatePickerComponent,
    argTypes: {
        type: {
            options: ["default", "range"],
            control: {
                type: "select",
            },
        },
    },
    tags: ["autodocs"],
};
export default meta;

const today = getCurrentDate();

export const DatePicker: StoryObj<DefaultDatePickerProps> = {
    args: {
        type: "default",
    },
    render: (args) => {
        const [date, setDate] = useState<DefaultDatePickerProps["value"]>(
            formatToDateString(today),
        );

        return <DatePickerComponent value={date} onChange={setDate} type={args.type} />;
    },
};

export const Range: StoryObj<RangeDatePickerProps> = {
    args: {
        type: "range",
    },
    render: (args) => {
        const [date, setDate] = useState<RangeDatePickerProps["value"]>([
            formatToDateString(today.subtract(7, "day")),
            formatToDateString(today),
        ]);

        return <DatePickerComponent value={date} onChange={setDate} type={args.type} />;
    },
};

export const TwoColumnsView: StoryObj<RangeDatePickerProps> = {
    args: {
        type: "range",
        numberOfColumns: 2,
    },
    render: (args) => {
        const [date, setDate] = useState<RangeDatePickerProps["value"]>([
            formatToDateString(today.startOf("month")),
            formatToDateString(today),
        ]);

        return (
            <DatePickerComponent
                value={date}
                onChange={setDate}
                type={args.type}
                numberOfColumns={args.numberOfColumns}
            />
        );
    },
};

export const WithPresets: StoryObj<RangeDatePickerProps> = {
    args: {
        value: [null, null],
        type: "range",
        numberOfColumns: 2,
    },
    render: (args) => {
        const [date, setDate] = useState<RangeDatePickerProps["value"]>(args.value);

        return (
            <DatePickerComponent
                value={date}
                onChange={setDate}
                type={args.type}
                numberOfColumns={args.numberOfColumns}
                presets={getBaseCalendarPresets()}
            />
        );
    },
};
