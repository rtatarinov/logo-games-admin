import type { Meta, StoryObj } from "@storybook/react";
import { IconBook2 } from "@tabler/icons-react";

import type { NavItemProps } from "./ui";
import { NavItem as NavItemComponent } from "./ui";

const meta: Meta<typeof NavItemComponent> = {
    title: "Navigation/NavItem",
    component: NavItemComponent,
    tags: ["autodocs"],
};

export default meta;

export const NavItem: StoryObj<NavItemProps> = {
    args: {
        icon: <IconBook2 width={24} height={24} />,
        to: "#",
    },
    render: (args) => <NavItemComponent {...args}>Список задач</NavItemComponent>,
};
