import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { IconLock } from "@tabler/icons-react";

import type { PasswordInputProps } from "./ui";
import { PasswordInput as PasswordInputComponent } from "./ui";

const meta: Meta<typeof PasswordInputComponent> = {
    title: "Form/PasswordInput",
    component: PasswordInputComponent,
    tags: ["autodocs"],
};

export default meta;

export const PasswordInput: StoryObj<PasswordInputProps> = {
    args: {
        leftSection: <IconLock width={20} height={20} />,
    },
    render: (args) => {
        const [value, setValue] = useState("");

        return (
            <PasswordInputComponent
                value={value}
                onChange={setValue}
                placeholder={args.placeholder}
                leftSection={args.leftSection}
            />
        );
    },
};
