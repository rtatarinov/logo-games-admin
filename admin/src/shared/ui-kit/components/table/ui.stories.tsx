import type { Meta, StoryObj } from "@storybook/react";

import type { SimpleTableProps, TableProps } from "./ui";
import { Table as TableComponent } from "./ui";

const meta: Meta<typeof TableComponent> = {
    title: "Typography/Table",
    component: TableComponent,
    tags: ["autodocs"],
};

export default meta;

export const Table: StoryObj<TableProps> = {
    args: {
        data: {
            head: ["Название события"],
            body: [
                ["Аборт"],
                ["Браковка"],
                ["Взвешивание"],
                ["Выбытие"],
                ["Ввод препарата"],
                ["Осеменение"],
                ["Обработка копыт"],
                ["Отёл"],
                ["Перемещение"],
                ["Проверка на антибиотики"],
                ["Профилактический осмотр"],
                ["УЗИ"],
            ],
        },
    },
    render: (args: SimpleTableProps) => <TableComponent {...args} />,
};
