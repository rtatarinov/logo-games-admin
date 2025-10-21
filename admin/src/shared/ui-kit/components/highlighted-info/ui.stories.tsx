import type { Meta, StoryObj } from "@storybook/react";
import { IconVaccine } from "@tabler/icons-react";

import type { HighlightedInfoProps } from "./ui";
import { HighlightedInfo as HighlightedInfoComponent } from "./ui";

const meta: Meta<typeof HighlightedInfoComponent> = {
    title: "Data Display/HighlightedInfo",
    component: HighlightedInfoComponent,
    tags: ["autodocs"],
};

export default meta;

export const HighlightedInfo: StoryObj<HighlightedInfoProps> = {
    render: () => (
        <HighlightedInfoComponent
            icon={<IconVaccine width={24} height={24} />}
            label="Заболевания:"
        >
            Ценуроз церебральный
        </HighlightedInfoComponent>
    ),
};
