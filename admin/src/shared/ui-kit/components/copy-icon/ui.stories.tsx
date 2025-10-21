import { tw } from "typewind";

import type { Meta, StoryObj } from "@storybook/react";

import type { CopyIconProps } from "./ui";
import { CopyIcon as CopyIconComponent } from "./ui";

const meta: Meta<typeof CopyIconComponent> = {
    title: "Buttons/CopyIcon",
    component: CopyIconComponent,
    tags: ["autodocs"],
};

export default meta;

export const CopyIcon: StoryObj<CopyIconProps> = {
    render: () => {
        const value = "Скопировать этот текст";

        return (
            <div className={tw.flex.gap_2.items_center}>
                <div className={tw.text_body_16.font_semibold}>{value}</div>
                <CopyIconComponent value={value} />
            </div>
        );
    },
};
