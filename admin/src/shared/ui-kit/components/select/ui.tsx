import type { HTMLAttributes, ReactNode } from "react";
import { memo, useContext } from "react";

import cx from "classnames";
import { isNil, isNotNil } from "ramda";
import { tw } from "typewind";

import { IconChevronDown, IconChevronUp, IconSearch, IconX } from "@tabler/icons-react";

import { buildInputClassName } from "../input/lib";
import type { PopoverProps } from "../popover";
import { Popover, PopoverContext } from "../popover";
import type { TextInputProps } from "../text-input";
import { TextInput } from "../text-input";

const _Select = ({ children, ...rest }: PopoverProps) => {
    return <Popover {...rest}>{children}</Popover>;
};

export interface SelectTargetProps {
    children: ReactNode;
    label?: ReactNode;
    description?: ReactNode;
    placeholder?: string;
    className?: string;
    onClick?: () => void;
    onClear?: () => void;
}

const _Target = ({
    children,
    className,
    label,
    description,
    onClick,
    onClear,
    placeholder = "...",
}: SelectTargetProps) => {
    const { error, required, opened, disabled } = useContext(PopoverContext);

    const inputClassNames = buildInputClassName({
        withError: isNotNil(error),
    });

    return (
        <Popover.Target>
            <div className={cx(inputClassNames.root, className)} onClick={onClick}>
                {label && (
                    <label
                        className={cx(inputClassNames.label, {
                            [tw.text_grey]: disabled,
                        })}
                    >
                        {label} {required && <span className={inputClassNames.required}>*</span>}
                    </label>
                )}

                {description && <div className={inputClassNames.description}>{description}</div>}

                <button
                    className={cx(
                        inputClassNames.input,
                        tw.border.border_solid.flex.cursor_pointer.items_center.justify_between
                            .min_h_["36px"],
                        { [tw.bg_transparent]: isNil(error), [tw.bg_light_red]: isNotNil(error) },
                    )}
                    type="button"
                    disabled={disabled}
                >
                    <div className={tw.min_w_0}>
                        <div
                            className={cx(
                                tw.truncate.text_body_16.text_black,
                                isNil(children) && tw.text_dark_grey,
                            )}
                        >
                            {children ?? placeholder}
                        </div>
                    </div>

                    <div className={tw.flex.gap_2.items_baseline.ml_2.text_black}>
                        {onClear && (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClear();
                                }}
                                className={tw.leading_none.text_black}
                            >
                                <IconX width={16} height={16} />
                            </div>
                        )}

                        {opened ? (
                            <IconChevronUp width={16} height={16} />
                        ) : (
                            <IconChevronDown width={16} height={16} />
                        )}
                    </div>
                </button>

                {isNotNil(error) && <div className={inputClassNames.error}>{error}</div>}
            </div>
        </Popover.Target>
    );
};

const _Search = ({ className, ...rest }: TextInputProps) => (
    <TextInput
        leftSection={<IconSearch width={20} height={20} />}
        className={cx(tw.mb_2, className)}
        inputClassName={tw.border_none.bg_light_grey}
        {...rest}
    />
);

export type SelectSimpleItem = Exclude<HTMLAttributes<HTMLLIElement>, "id" | "onClick"> & {
    label: ReactNode;
    id: string | number;
    active?: boolean;
};

export type SelectComplexItem = {
    title: ReactNode;
    items: SelectSimpleItem[];
};

export type SelectItem = SelectSimpleItem | SelectComplexItem;

const isSelectComplexItem = (item: SelectItem): item is SelectComplexItem => "items" in item;

const _Item = ({ label, id, className, active, ...rest }: SelectSimpleItem) => (
    <li
        className={cx(
            tw.flex.py_2.px_2.cursor_pointer.hover(tw.bg_light_green),
            {
                [tw.bg_blue.text_white.hover(tw.important(tw.bg_blue))]: Boolean(active),
            },
            className,
        )}
        id={isNotNil(id) ? String(id) : undefined}
        {...rest}
    >
        {label}
    </li>
);

export interface SelectItemProps {
    items: SelectItem[];
    className?: string;
    emptyMessage?: ReactNode;
}

const _Items = ({ items, className, emptyMessage }: SelectItemProps) => (
    <>
        {items.length === 0 && isNotNil(emptyMessage) ? (
            <div className={tw.text_body_14.text_dark_grey.py_2}>{emptyMessage}</div>
        ) : null}

        {items.length > 0 && (
            <ul
                className={cx(
                    tw.m_0.p_0.flex.flex_col,
                    isSelectComplexItem(items[0]) ? tw.gap_3 : tw.gap_1,
                    className,
                )}
            >
                {items.map((item, index) =>
                    isSelectComplexItem(item) ? (
                        // eslint-disable-next-line react/no-array-index-key
                        <li className={tw.flex.flex_col.gap_2} key={index}>
                            <h4 className={tw.text_body_14.text_grey.font_semibold.m_0.italic}>
                                {item.title}
                            </h4>

                            <ul className={tw.m_0.p_0}>
                                {item.items.map((item) => (
                                    <_Item key={item.id} {...item} />
                                ))}
                            </ul>
                        </li>
                    ) : (
                        <_Item key={item.id} {...item} />
                    ),
                )}
            </ul>
        )}
    </>
);

export const Select = Object.assign(memo(_Select), {
    Target: memo(_Target),
    Dropdown: memo(Popover.Dropdown),
    Search: memo(_Search),
    Items: memo(_Items),
    Item: memo(_Item),
});
