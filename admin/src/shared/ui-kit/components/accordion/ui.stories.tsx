import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Accordion as AccordionComponent } from "./ui";

const items = [
    {
        disabled: false,
        value: "1",
        title: "Простой метрит",
        content:
            "Простой метрит — это воспаление слизистой оболочки матки у коров, возникающее в первые дни после отёла. Заболевание часто развивается в результате задержания последа, травм во время родов или инфицирования матки.",
    },
    {
        disabled: false,
        value: "2",
        title: "Сложный метрит",
        content:
            "Сложный метрит — это воспаление слизистой оболочки матки у коров, возникающее в первые дни после отёла. Заболевание часто развивается в результате задержания последа, травм во время родов или инфицирования матки.",
    },
];

const meta: Meta<typeof AccordionComponent> = {
    title: "Data Display/Accordion",
    component: AccordionComponent,
    argTypes: {
        multiple: { control: { type: "boolean", defaultValue: true } },
    },
    tags: ["autodocs"],
};

export default meta;

export const Accordion: StoryObj<typeof AccordionComponent<false>> = {
    render: () => {
        const [value, setValue] = useState<string | null>(null);

        return <AccordionComponent items={items} value={value} onChange={setValue} />;
    },
};

export const Multiple: StoryObj<typeof AccordionComponent<true>> = {
    render: () => {
        const [value, setValue] = useState<string[]>([]);

        return (
            <AccordionComponent items={items} multiple={true} value={value} onChange={setValue} />
        );
    },
};
