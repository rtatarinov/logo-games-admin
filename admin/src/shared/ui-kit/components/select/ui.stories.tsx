import { useMemo, useState } from "react";

import { tw } from "typewind";

import { useDisclosure } from "@mantine/hooks";
import type { Meta, StoryObj } from "@storybook/react";

import { matchesSearch } from "@app/shared/lib/string";

import { Select as SelectComponent } from "./ui";

const meta: Meta<typeof SelectComponent> = {
    title: "Form/Select",
    component: SelectComponent,
    argTypes: {},
    tags: ["autodocs"],
};
export default meta;

const options = [
    { label: "Ферма 1", id: 1 },
    { label: "Ферма 2", id: 2 },
    { label: "Ферма 3", id: 3 },
    { label: "Ферма 4", id: 4 },
];

export const Select: StoryObj<typeof SelectComponent> = {
    render: () => {
        const [search, setSearch] = useState("");
        const [activeOption, setActiveOption] = useState(options[0]);
        const [opened, { toggle, close }] = useDisclosure(false);

        const farms = useMemo(
            () =>
                options
                    .filter((item) => matchesSearch(item.label, search))
                    .map((item) => ({
                        ...item,
                        id: String(item.id),
                        active: item.id === activeOption.id,
                        onClick: () => {
                            setActiveOption(item);
                            close();
                        },
                    })),
            [activeOption.id, close, search],
        );

        return (
            <div className={tw.min_h_["480px"].relative}>
                <SelectComponent
                    onClose={close}
                    opened={opened}
                    required={true}
                    popoverProps={{ position: "bottom-start", width: "target" }}
                    drawerProps={{ title: "Выберите ферму", offset: 0 }}
                    error="Обязательное поле"
                >
                    <SelectComponent.Target
                        label="Ферма"
                        description="Выберите ферму из списка ниже"
                        onClick={toggle}
                    >
                        {activeOption.label}
                    </SelectComponent.Target>

                    <SelectComponent.Dropdown>
                        <SelectComponent.Search value={search} onChange={setSearch} />
                        <SelectComponent.Items items={farms} emptyMessage="Фермы не найдены" />
                    </SelectComponent.Dropdown>
                </SelectComponent>
            </div>
        );
    },
};
