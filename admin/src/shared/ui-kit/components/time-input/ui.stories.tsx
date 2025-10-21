import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { TimeInputProps } from "./ui";
import { TimeInput as TimeInputComponent } from "./ui";

const meta: Meta<typeof TimeInputComponent> = {
    title: "Form/TimeInput",
    component: TimeInputComponent,
    tags: ["autodocs"],
};

export default meta;

export const TimeInput: StoryObj<TimeInputProps> = {
    render: () => {
        const [date, setTime] = useState("15:00");

        return <TimeInputComponent value={date} onChange={setTime} />;
    },
};

export const WithLabel: StoryObj<TimeInputProps> = {
    args: {
        label: "Время рождения",
        description: "Выберите время рождения животного",
        required: true,
    },
    render: (args) => {
        const [date, setTime] = useState("15:00");

        return (
            <TimeInputComponent
                value={date}
                onChange={setTime}
                label={args.label}
                description={args.description}
                required={args.required}
            />
        );
    },
};
