import { tw } from "typewind";

import type { Meta, StoryObj } from "@storybook/react";

import type { CopyButtonProps } from "./ui";
import { CopyButton as CopyButtonComponent } from "./ui";

const meta: Meta<typeof CopyButtonComponent> = {
    title: "Buttons/CopyButton",
    component: CopyButtonComponent,
    tags: ["autodocs"],
};

export default meta;

export const CopyButton: StoryObj<CopyButtonProps> = {
    render: () => (
        <div className={tw.flex.gap_2.items_center}>
            <CopyButtonComponent
                value={window.location.href}
                text="Скопировать url"
                copiedText="url скопирован"
            />
        </div>
    ),
};
