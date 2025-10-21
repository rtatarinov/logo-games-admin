import type { Meta, StoryObj } from "@storybook/react";
import { IconLibraryPlus } from "@tabler/icons-react";

import { Button as ButtonComponent } from "./ui";

const meta: Meta<typeof ButtonComponent> = {
    title: "Buttons/Button",
    component: ButtonComponent,
    argTypes: {
        mode: {
            options: ["fill", "outline", "link", "light"],
            control: {
                type: "select",
            },
        },
        color: {
            options: ["green", "black", "orange", "red"],
            control: {
                type: "select",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

export const Button: StoryObj<typeof ButtonComponent<"button">> = {
    args: {
        children: "Полноэкранный режим",
        mode: "fill",
        color: "green",
    },
    render: (args) => <ButtonComponent {...args} />,
};

export const WithLeftSection: StoryObj<typeof ButtonComponent<"button">> = {
    args: {
        children: "Добавить ферму",
        mode: "fill",
        color: "green",
        leftSection: <IconLibraryPlus width={24} height={24} />,
    },
    render: (args) => <ButtonComponent {...args} />,
};

export const LoadingButton: StoryObj<typeof ButtonComponent<"button">> = {
    args: {
        children: "Добавить ферму",
        mode: "fill",
        color: "green",
        leftSection: <IconLibraryPlus width={24} height={24} />,
        loading: true,
    },
    render: (args) => <ButtonComponent {...args} />,
};

export const Disabled: StoryObj<typeof ButtonComponent<"button">> = {
    args: {
        children: "Полноэкранный режим",
        mode: "fill",
        color: "green",
    },
    render: (args) => <ButtonComponent disabled={true} {...args} />,
};
