import type { ReactNode } from "react";
import { forwardRef, memo } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { TabsProps as MantineTabsProps } from "@mantine/core";
import { createPolymorphicComponent, Tabs as MantineTabs } from "@mantine/core";

export interface TabProps {
    value: string;
    label: ReactNode;
    leftSection?: ReactNode;
    component: ReactNode;
}

export interface TabsProps
    extends Pick<MantineTabsProps, "id" | "onChange" | "value" | "className"> {
    items: TabProps[];
}

const _Tabs = forwardRef<HTMLDivElement, TabsProps>(
    ({ items, value, onChange, className, ...rest }, ref) => (
        <MantineTabs
            ref={ref}
            defaultValue={value ?? items[0].value}
            classNames={{
                root: cx(tw.flex.flex_col.gap_8, className),
                list: tw.flex_nowrap.w_full.overflow_x_auto,
                tab: tw.gap_2.px_3.py_[2.5].transition_colors.active(tw.border_blue).lg(tw.px_6),
                tabLabel: tw.text_body_16,
                tabSection: tw.m_0,
            }}
            value={value}
            onChange={onChange}
            {...rest}
        >
            <MantineTabs.List>
                {items.map((item) => (
                    <MantineTabs.Tab
                        key={item.value}
                        value={item.value}
                        leftSection={item.leftSection}
                    >
                        {item.label}
                    </MantineTabs.Tab>
                ))}
            </MantineTabs.List>

            {items.map((item) => (
                <MantineTabs.Panel key={item.value} value={item.value}>
                    {item.component}
                </MantineTabs.Panel>
            ))}
        </MantineTabs>
    ),
);

_Tabs.displayName = "Tabs";

export const Tabs = createPolymorphicComponent<"div", TabsProps>(memo(_Tabs));
