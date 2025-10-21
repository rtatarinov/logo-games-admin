import type { Meta, StoryObj } from "@storybook/react";
import { IconUser } from "@tabler/icons-react";

import { IconBlock as IconBlockComponent } from "./ui";

const meta: Meta<typeof IconBlockComponent> = {
    title: "Data Display/IconBlock",
    component: IconBlockComponent,
    tags: ["autodocs"],
};

export default meta;

export const IconBlock: StoryObj<typeof IconBlockComponent<"span">> = {
    render: () => (
        <IconBlockComponent>
            <IconUser width={20} height={20} />
        </IconBlockComponent>
    ),
};
