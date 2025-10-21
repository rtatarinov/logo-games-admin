import type { Meta, StoryObj } from "@storybook/react";
import { IconTimeDuration15 } from "@tabler/icons-react";

import type { BadgeProps } from "./ui";
import { Badge as BadgeComponent } from "./ui";

const meta: Meta<typeof BadgeComponent> = {
    title: "Data Display/Badge",
    component: BadgeComponent,
    argTypes: {
        mode: {
            options: ["fill", "outline"],
            control: {
                type: "select",
            },
        },
        color: {
            options: ["green", "orange", "red", "black", "grey"],
            control: {
                type: "select",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

export const Badge: StoryObj<BadgeProps> = {
    args: {
        children: "В стаде",
        mode: "fill",
        color: "green",
    },
    render: (args) => <BadgeComponent {...args} />,
};

export const WithLeftSection: StoryObj<BadgeProps> = {
    args: {
        children: "Запланировать событие",
        mode: "fill",
        color: "green",
        leftSection: <IconTimeDuration15 width={16} height={16} />,
    },
    render: (args) => <BadgeComponent {...args} />,
};
