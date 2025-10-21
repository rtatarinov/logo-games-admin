import type { Meta, StoryObj } from "@storybook/react";

import { MultiLineText as MultiLineTextComponent } from "./ui";

const sampleText = "Строка 1\nСтрока 2\n  \n\nСтрока 3\n\n";

const meta: Meta<typeof MultiLineTextComponent> = {
    title: "Typography/MultiLineText",
    component: MultiLineTextComponent,
    argTypes: {
        text: { control: { type: "text", defaultValue: sampleText } },
        skipEmpty: { control: { type: "boolean", defaultValue: true } },
    },
    tags: ["autodocs"],
};

export default meta;

export const MultiLineText: StoryObj<typeof MultiLineTextComponent> = {
    args: {
        text: sampleText,
        skipEmpty: true,
    },
    render: (args) => {
        return <MultiLineTextComponent {...args} />;
    },
};
