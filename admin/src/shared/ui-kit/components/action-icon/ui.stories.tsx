import type { Meta, StoryObj } from "@storybook/react";
import { IconX } from "@tabler/icons-react";

import { ActionIcon as ActionIconComponent } from "./ui";

const meta: Meta<typeof ActionIconComponent> = {
    title: "Buttons/ActionIcon",
    component: ActionIconComponent,
    argTypes: {
        disabled: {
            control: "boolean",
            default: false,
        },
        loading: {
            control: "boolean",
            default: false,
        },
    },
    tags: ["autodocs"],
};

export default meta;

export const ActionIcon: StoryObj<typeof ActionIconComponent<"button">> = {
    args: {
        children: <IconX width={24} height={24} />,
    },
    render: (args) => <ActionIconComponent {...args} />,
};

export const Loading: StoryObj<typeof ActionIconComponent<"button">> = {
    args: {
        children: <IconX width={24} height={24} />,
        loading: true,
        loaderProps: {
            type: "dots",
            size: 16,
        },
    },
    render: (args) => <ActionIconComponent {...args} />,
};
