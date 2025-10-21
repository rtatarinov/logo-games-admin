import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
    formatToDateString,
    getBaseCalendarPresets,
    getCurrentDate,
} from "@app/shared/lib/date-and-time";
import type { DateValue, RangeDatePickerProps } from "@app/shared/ui-kit/components/date-picker";

import type { DateInputPickerProps } from "./ui";
import { DatePickerInput as DateInputPickerComponent } from "./ui";

const meta: Meta<typeof DateInputPickerComponent> = {
    title: "Dates/DatePickerInput",
    component: DateInputPickerComponent,
    tags: ["autodocs"],
};
export default meta;

const today = getCurrentDate();

export const DateInputPicker: StoryObj<DateInputPickerProps> = {
    render: () => {
        const [date, setDate] = useState<DateValue>(formatToDateString(today));

        return (
            <DateInputPickerComponent
                value={date}
                onChange={setDate}
                type="default"
                inputProps={{
                    label: "Выберите дату",
                }}
                confirmButtonText="Done"
            />
        );
    },
};

export const DateRangeInputPicker: StoryObj<DateInputPickerProps> = {
    render: () => {
        const [date, setDate] = useState<RangeDatePickerProps["value"]>([
            formatToDateString(today),
            formatToDateString(today.add(26, "day")),
        ]);

        return (
            <DateInputPickerComponent
                value={date}
                onChange={setDate}
                type="range"
                inputProps={{
                    label: "Выберите диапазон дат",
                    placeholder: "Выберите диапазон дат",
                }}
                confirmButtonText="Done"
                numberOfColumns={2}
                presets={getBaseCalendarPresets()}
            />
        );
    },
};
