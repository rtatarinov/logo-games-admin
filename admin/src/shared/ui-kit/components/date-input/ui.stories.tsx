import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { DateInputProps } from "./ui";
import { DateInput as DateInputComponent } from "./ui";

const meta: Meta<typeof DateInputComponent> = {
    title: "Dates/DateInput",
    component: DateInputComponent,
    tags: ["autodocs"],
};
export default meta;

export const DateInput: StoryObj<DateInputProps> = {
    render: () => {
        const [value, setValue] = useState("");

        return <DateInputComponent value={value} onChange={setValue} />;
    },
};
