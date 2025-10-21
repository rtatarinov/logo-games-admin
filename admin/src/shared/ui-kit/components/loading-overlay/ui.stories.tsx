import { tw } from "typewind";

import type { Meta, StoryObj } from "@storybook/react";

import type { LoadingOverlayProps } from "./ui";
import { LoadingOverlay as LoadingOverlayComponent } from "./ui";

const meta: Meta<typeof LoadingOverlayComponent> = {
    title: "Overlays/LoadingOverlay",
    component: LoadingOverlayComponent,
    tags: ["autodocs"],
};

export default meta;

export const LoadingOverlay: StoryObj<LoadingOverlayProps> = {
    args: {
        visible: true,
    },
    render: (args) => (
        <div className={tw.relative.w_80.h_80}>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing
            </p>

            <LoadingOverlayComponent {...args} />
        </div>
    ),
};
