import { tw } from "typewind";

import type { Meta, StoryObj } from "@storybook/react";

import type { ScrollAreaProps } from "./ui";
import { ScrollArea as ScrollAreaComponent } from "./ui";

const meta: Meta<typeof ScrollAreaComponent> = {
    title: "Misc/ScrollArea",
    component: ScrollAreaComponent,
    tags: ["autodocs"],
};

export default meta;

export const ScrollArea: StoryObj<ScrollAreaProps> = {
    args: {
        height: 120,
        disableOnMobile: true,
    },
    render: (args) => (
        <ScrollAreaComponent {...args}>
            <ul>
                {Array.from({ length: 25 }).map((_, index) => (
                    <li className={tw.py_2}>{index}</li>
                ))}
            </ul>
        </ScrollAreaComponent>
    ),
};
