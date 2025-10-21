import { tw } from "typewind";

import type { Meta, StoryObj } from "@storybook/react";
import { IconLibraryPlus } from "@tabler/icons-react";

import { ActionButton as ActionButtonComponent } from "./ui";

const meta: Meta<typeof ActionButtonComponent> = {
    title: "Buttons/ActionButton",
    component: ActionButtonComponent,
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

export const ActionButton: StoryObj<typeof ActionButtonComponent<"button">> = {
    args: {
        leftSection: <IconLibraryPlus width={24} height={24} />,
        label: "Действия",
        drawerProps: {
            title: "Действия",
        },
        popoverProps: {
            width: "target",
        },
        targetClassName: tw.min_w_["240px"],
    },
    render: (args) => (
        <ActionButtonComponent {...args}>
            <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={tw.text_black.bg_white.hover(tw.bg_light_grey)}
            >
                Запланировать событие
            </a>

            <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={tw.text_black.bg_white.hover(tw.bg_light_grey)}
            >
                Выполнить событие
            </a>
        </ActionButtonComponent>
    ),
};
