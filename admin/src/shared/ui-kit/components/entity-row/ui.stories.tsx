import { tw } from "typewind";

import type { Meta, StoryObj } from "@storybook/react";
import { IconEdit, IconPassword, IconTrashX } from "@tabler/icons-react";

import { noop } from "@app/shared/lib/noop";
import { ActionIcon } from "@app/shared/ui-kit/components";

import { EntityRow as EntityRowComponent } from "./ui";

const meta: Meta<typeof EntityRowComponent> = {
    title: "Data Display/EntityRow",
    component: EntityRowComponent,
    tags: ["autodocs"],
};

export default meta;

export const EntityRow: StoryObj<typeof EntityRowComponent<"span">> = {
    args: {
        title: "Луговая",
        children: "Ферма Луговая — свежие продукты с заботой о природе",
        actions: (
            <>
                <ActionIcon onClick={noop} mode="grey">
                    <IconPassword width={20} height={20} />
                </ActionIcon>

                <ActionIcon onClick={noop} mode="grey">
                    <IconEdit width={20} height={20} />
                </ActionIcon>

                <ActionIcon onClick={noop} mode="grey">
                    <IconTrashX width={20} height={20} className={tw.text_red} />
                </ActionIcon>
            </>
        ),
    },
    render: (args) => <EntityRowComponent {...args} />,
};
