import type { Meta, StoryObj } from "@storybook/react";
import { IconCalendarEvent, IconInfoCircle, IconMilk, IconThermometer } from "@tabler/icons-react";

import type { TabProps } from "./ui";
import { Tabs as TabsComponent } from "./ui";

const meta: Meta<typeof TabsComponent> = {
    title: "Navigation/Tabs",
    component: TabsComponent,
    tags: ["autodocs"],
};

export default meta;

const data: TabProps[] = [
    {
        label: "Информация",
        value: "information",
        component: <p>Информация</p>,
        leftSection: <IconInfoCircle width={24} height={24} />,
    },
    {
        label: "Мед. карта",
        value: "medication",
        component: <p>Медицинская карта</p>,
        leftSection: <IconThermometer width={24} height={24} />,
    },
    {
        label: "События",
        value: "events",
        component: <p>События</p>,
        leftSection: <IconCalendarEvent width={24} height={24} />,
    },
    {
        label: "Удой",
        value: "milk-results",
        component: <p>Удой</p>,
        leftSection: <IconMilk width={24} height={24} />,
    },
];

export const Tabs: StoryObj<typeof TabsComponent<"div">> = {
    render: () => {
        return <TabsComponent items={data} />;
    },
};
