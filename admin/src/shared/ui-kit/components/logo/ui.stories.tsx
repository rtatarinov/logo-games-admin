import type { Meta, StoryObj } from "@storybook/react";

import { Logo as LogoComponent } from "./ui";

const meta: Meta<typeof LogoComponent> = {
    title: "Branding/Logo",
    component: LogoComponent,
    argTypes: {
        mode: {
            options: ["full", "symbol"],
            control: {
                type: "select",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;

export const Logo: StoryObj<typeof LogoComponent> = {
    args: {
        mode: "full",
        width: 229,
        height: 41,
    },
    render: (args) => <LogoComponent {...args} />,
};

export const LogoSymbol: StoryObj<typeof LogoComponent> = {
    args: {
        mode: "symbol",
        width: 41,
        height: 41,
    },
    render: (args) => <LogoComponent {...args} />,
};
