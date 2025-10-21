import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { noop } from "@app/shared/lib/noop";

import type { TextareaProps } from "./ui";
import { Textarea as TextareaComponent } from "./ui";

const meta: Meta<typeof TextareaComponent> = {
    title: "Form/Textarea",
    component: TextareaComponent,
    tags: ["autodocs"],
};
export default meta;

export const Textarea: StoryObj<TextareaProps> = {
    args: {
        placeholder: "...",
        label: "Описание фермы",
        description: "писание фермы должно быть не более 1000 символов",
        required: true,
    },
    render: (args: TextareaProps) => {
        const [value, setValue] = useState("");
        const handleChange = (value: string) => setValue(value);

        return <TextareaComponent {...args} value={value} onChange={handleChange} />;
    },
};

export const WithError: StoryObj<TextareaProps> = {
    args: {
        placeholder: "...",
        value: "",
        onChange: noop,
        error: "Обязательное поле",
        label: "Описание фермы",
        description: "писание фермы должно быть не более 1000 символов",
        required: true,
    },
    render: (args: TextareaProps) => {
        return <TextareaComponent {...args} />;
    },
};
