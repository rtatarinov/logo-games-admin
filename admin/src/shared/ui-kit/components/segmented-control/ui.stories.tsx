import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { SegmentedControl as SegmentedControlComponent } from "./ui";

const meta: Meta<typeof SegmentedControlComponent> = {
    title: "Form/SegmentedControl",
    component: SegmentedControlComponent,
    tags: ["autodocs"],
};

export default meta;

const data = [
    { label: "Жен.", value: "женский" },
    { label: "Муж.", value: "мужской" },
];

export const SegmentedControl: StoryObj<typeof SegmentedControlComponent<"div">> = {
    args: { data },
    render: (args) => {
        const [value, setValue] = useState(data[0].value);

        return (
            <SegmentedControlComponent
                value={value}
                required={true}
                label="Пол животного"
                description="Выберите значение ниже"
                onChange={(payload) => setValue(payload.value)}
                error="Недопустимое значение"
                data={args.data}
            />
        );
    },
};
