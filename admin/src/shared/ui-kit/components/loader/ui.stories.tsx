import type { Meta, StoryObj } from "@storybook/react";

import type { LoaderProps } from "./ui";
import { Loader as LoaderComponent } from "./ui";

const meta: Meta<typeof LoaderComponent> = {
    title: "Feedback/Loader",
    component: LoaderComponent,
    argTypes: {
        type: {
            options: ["dots", "bars", "oval"],
            control: {
                type: "select",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

export const Loader: StoryObj<LoaderProps> = {
    args: {
        size: 32,
    },
    render: (args) => <LoaderComponent {...args} />,
};
