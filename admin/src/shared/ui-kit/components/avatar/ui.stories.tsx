import type { Meta, StoryObj } from "@storybook/react";

import type { AvatarProps } from "./ui";
import { Avatar as AvatarComponent } from "./ui";

const meta: Meta<typeof AvatarComponent> = {
    title: "User/Avatar",
    component: AvatarComponent,
    tags: ["autodocs"],
};

export default meta;

export const Avatar: StoryObj<AvatarProps> = {
    args: {
        size: 64,
        name: "Роман Татаринов",
    },
    render: (args) => <AvatarComponent {...args} />,
};
