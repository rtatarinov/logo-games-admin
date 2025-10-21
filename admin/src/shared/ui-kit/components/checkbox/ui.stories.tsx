import type { Meta, StoryObj } from "@storybook/react";

import type { CheckboxProps } from "./ui";
import { Checkbox as CheckboxComponent } from "./ui";

const meta: Meta<typeof CheckboxComponent> = {
    title: "Form/Checkbox",
    component: CheckboxComponent,
    tags: ["autodocs"],
};

export default meta;

export const Checkbox: StoryObj<CheckboxProps> = {
    args: {
        label: "Соглашаюсь с условиями политики конфиденциальности",
    },
    render: (args) => <CheckboxComponent {...args} />,
};
