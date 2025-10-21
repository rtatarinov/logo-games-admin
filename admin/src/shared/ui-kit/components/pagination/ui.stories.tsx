import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import type { PaginationProps } from "./ui";
import { Pagination as PaginationComponent } from "./ui";

const meta: Meta<typeof PaginationComponent> = {
    title: "Navigation/Pagination",
    component: PaginationComponent,
    tags: ["autodocs"],
};

export default meta;

export const Pagination: StoryObj<PaginationProps> = {
    args: {
        total: 4,
    },
    render: (args) => {
        const [activePage, setActivePage] = useState(2);

        return <PaginationComponent {...args} value={activePage} onChange={setActivePage} />;
    },
};
