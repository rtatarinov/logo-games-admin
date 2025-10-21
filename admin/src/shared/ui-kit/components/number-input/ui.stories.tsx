import { useState } from "react";

import { isNotEmpty, isNotNil } from "ramda";

import type { Meta, StoryObj } from "@storybook/react";

import type { NumberInputProps } from "./ui";
import { NumberInput as NumberInputComponent } from "./ui";

const meta: Meta<typeof NumberInputComponent> = {
    title: "Form/NumberInput",
    component: NumberInputComponent,
    tags: ["autodocs"],
};

export default meta;

export const NumberInput: StoryObj<NumberInputProps> = {
    args: {
        placeholder: "...",
        withClearButton: true,
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <NumberInputComponent
                value={value}
                onChange={setValue}
                withClearButton={isNotNil(value) && isNotEmpty(value)}
                placeholder={args.placeholder}
                leftSection={args.leftSection}
            />
        );
    },
};

export const WithLabel: StoryObj<NumberInputProps> = {
    args: {
        placeholder: "...",
        label: "Номер бирки",
        description: "Максимальная 12 символов",
        required: true,
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <NumberInputComponent
                value={value}
                onChange={setValue}
                placeholder={args.placeholder}
                label={args.label}
                description={args.description}
                required={args.required}
            />
        );
    },
};

export const WithError: StoryObj<NumberInputProps> = {
    args: {
        placeholder: "...",
        withClearButton: true,
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <NumberInputComponent
                value={value}
                onChange={setValue}
                placeholder={args.placeholder}
                leftSection={args.leftSection}
                error="Минимальная длина 3 символа"
            />
        );
    },
};
