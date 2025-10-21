import type { Meta, StoryObj } from "@storybook/react";

import type { PageTitleProps } from "./ui";
import { PageTitle as PageTitleComponent } from "./ui";

const meta: Meta<typeof PageTitleComponent> = {
    title: "Typography/PageTitle",
    component: PageTitleComponent,
    tags: ["autodocs"],
};

export default meta;

export const PageTitle: StoryObj<PageTitleProps> = {
    render: (args) => <PageTitleComponent {...args}>Список задач</PageTitleComponent>,
};
