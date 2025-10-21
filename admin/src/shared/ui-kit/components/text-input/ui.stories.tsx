import { useState } from "react";

import { isNotEmpty, isNotNil } from "ramda";

import type { Meta, StoryObj } from "@storybook/react";
import { IconSearch } from "@tabler/icons-react";

import type { TextInputProps } from "./ui";
import { TextInput as TextInputComponent } from "./ui";

const meta: Meta<typeof TextInputComponent> = {
    title: "Form/TextInput",
    component: TextInputComponent,
    tags: ["autodocs"],
};

export default meta;

export const TextInput: StoryObj<TextInputProps> = {
    args: {
        placeholder: "Поиск...",
        withClearButton: true,
        leftSection: <IconSearch width={20} height={20} />,
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <TextInputComponent
                value={value}
                onChange={setValue}
                withClearButton={isNotNil(value) && isNotEmpty(value)}
                placeholder={args.placeholder}
                leftSection={args.leftSection}
            />
        );
    },
};

export const WithLabel: StoryObj<TextInputProps> = {
    args: {
        placeholder: "...",
        label: "Название фермы",
        description: "Максимальная длина 256 символов",
        required: true,
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <TextInputComponent
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

export const WithError: StoryObj<TextInputProps> = {
    args: {
        placeholder: "Поиск...",
        withClearButton: true,
        leftSection: <IconSearch width={20} height={20} />,
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <TextInputComponent
                value={value}
                onChange={setValue}
                placeholder={args.placeholder}
                leftSection={args.leftSection}
                error="Минимальная длина 25 символов"
            />
        );
    },
};
