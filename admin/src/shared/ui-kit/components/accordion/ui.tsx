import type { ReactNode } from "react";
import { memo } from "react";

import cx from "classnames";
import { isNotNil } from "ramda";
import { tw } from "typewind";

import type {
    AccordionControlProps as MantineAccordionControlProps,
    AccordionItemProps as MantineAccordionItemProps,
    AccordionProps as MantineAccordionProps,
} from "@mantine/core";
import { Accordion as MantineAccordion, createPolymorphicComponent } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export interface AccordionItem {
    value: string;
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}

export interface AccordionProps<Multiple extends boolean = false>
    extends Pick<
        MantineAccordionProps<Multiple>,
        "loop" | "order" | "children" | "value" | "defaultValue" | "onChange" | "multiple"
    > {
    items: AccordionItem[];
}

export type AccordionItemProps = Pick<MantineAccordionItemProps, "value">;
export type AccordionControlProps = Pick<MantineAccordionControlProps, "disabled" | "chevron">;

export interface AccordionPanelProps {
    onTransitionEnd?: "never";
}

const _Accordion = <Multiple extends boolean = false>({
    items,
    value,
    children,
    multiple,
    ...props
}: AccordionProps<Multiple>) => (
    <MantineAccordion
        {...props}
        value={value}
        multiple={multiple}
        variant="separated"
        chevronSize={20}
        classNames={{
            item: tw.border_none.border_b.border_b_solid.border_b_light_grey_hover.rounded_none.bg_transparent
                .important(tw.mt_0)
                .active(tw.border_b_blue),
            control: tw.flex_row.gap_3.text_body_20.active(tw.text_blue),
        }}
    >
        {isNotNil(items)
            ? items.map((item) => (
                  <MantineAccordion.Item key={item.value} value={item.value}>
                      <MantineAccordion.Control
                          chevron={<IconChevronDown width={20} height={20} />}
                          disabled={item.disabled}
                      >
                          {item.title}
                      </MantineAccordion.Control>

                      <MantineAccordion.Panel>
                          <div
                              className={cx({
                                  [tw.opacity_40]: item.disabled,
                              })}
                          >
                              {item.content}
                          </div>
                      </MantineAccordion.Panel>
                  </MantineAccordion.Item>
              ))
            : children}
    </MantineAccordion>
);

const _AccordionItem = createPolymorphicComponent<"div", AccordionItemProps>(MantineAccordion.Item);

const _AccordionControl = createPolymorphicComponent<"div", AccordionControlProps>(
    MantineAccordion.Control,
);

const _AccordionPanel = createPolymorphicComponent<"div", AccordionPanelProps>(
    MantineAccordion.Panel,
);

_Accordion.displayName = "Accordion";
_AccordionItem.displayName = "Accordion.Item";
_AccordionControl.displayName = "Accordion.Control";
_AccordionPanel.displayName = "Accordion.Panel";

export const Accordion = Object.assign(_Accordion, {
    Item: memo(_AccordionItem),
    Control: memo(_AccordionControl),
    Panel: memo(_AccordionPanel),
});
