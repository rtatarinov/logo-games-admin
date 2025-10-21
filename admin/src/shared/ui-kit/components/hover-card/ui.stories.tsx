import { tw } from "typewind";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { HoverCard as HoverCardComponent } from "./ui";

const meta: Meta<typeof HoverCardComponent> = {
    title: "Overlays/HoverCard",
    component: HoverCardComponent,
    tags: ["autodocs"],
};

export default meta;

export const HoverCard: StoryObj<typeof HoverCardComponent> = {
    args: {
        width: 400,
        children: (
            <>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic typesetting, remaining
                essentially unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
            </>
        ),
    },
    render: (args) => (
        <HoverCardComponent {...args}>
            <HoverCardComponent.Target>
                <Button>Hover</Button>
            </HoverCardComponent.Target>

            <HoverCardComponent.Dropdown className={tw.text_body_14.leading_5}>
                {args.children}
            </HoverCardComponent.Dropdown>
        </HoverCardComponent>
    ),
};
