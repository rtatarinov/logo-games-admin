import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";

import { isEmpty, isNotNil } from "ramda";
import type { Except } from "type-fest";
import { tw } from "typewind";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";

import type { PopoverProps, TextInputProps } from "@app/shared/ui-kit/components";
import { Button, Popover, TextInput } from "@app/shared/ui-kit/components";
import { DateInput, getDateConfig } from "@app/shared/ui-kit/components/date-input";
import type { DatePickerProps, DateValue } from "@app/shared/ui-kit/components/date-picker";
import { DatePicker } from "@app/shared/ui-kit/components/date-picker";
import { useTheme } from "@app/shared/ui-kit/theme";

import { buildInputValue } from "./lib";

import styles from "./DateInputPicker.module.css";

export type DateInputPickerProps = DatePickerProps & {
    confirmButtonText?: ReactNode;
    inputProps?: Except<TextInputProps, "value" | "onChange"> &
        Record<`data-${string}`, string | undefined>;
    popoverProps?: PopoverProps["popoverProps"];
};

const ConfirmButton = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => (
    <Button className={tw.w_full.mt_2.max_w_["350px"].mx_auto.lg(tw.hidden)} onClick={onClick}>
        {children}
    </Button>
);

type DefaultDateInputPickerProps = Except<
    DateInputPickerProps,
    "value" | "onChange" | "presets"
> & {
    value: DateValue;
    onChange: (date: DateValue) => void;
};

const DefaultDatePickerInput = ({
    value,
    onChange,
    inputProps,
    confirmButtonText = "Применить",
    popoverProps,
    className,
    ...rest
}: DefaultDateInputPickerProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    const handleDateChange = useCallback(
        (date: DateValue) => {
            onChange(date);
            close();
        },
        [onChange, close],
    );

    const theme = useTheme();
    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

    return (
        <Popover
            popoverProps={popoverProps}
            opened={opened}
            onClose={close}
            drawerProps={{ title: inputProps?.label, size: "lg" }}
        >
            <Popover.Target>
                <div className={className}>
                    <DateInput
                        {...(inputProps ?? {})}
                        value={value ?? ""}
                        onChange={onChange}
                        onClick={open}
                        readOnly={!isDesktop}
                    />
                </div>
            </Popover.Target>

            <Popover.Dropdown className={tw.p_1.lg(tw.p_2)}>
                {!isDesktop && (
                    <DateInput value={value ?? ""} onChange={onChange} className={tw.mb_4} />
                )}

                <DatePicker {...rest} type="default" value={value} onChange={handleDateChange} />
                <ConfirmButton onClick={close}>{confirmButtonText}</ConfirmButton>
            </Popover.Dropdown>
        </Popover>
    );
};

type RangeDateInputPickerProps = Except<DateInputPickerProps, "value" | "onChange"> & {
    value: [DateValue, DateValue];
    onChange: (date: [DateValue, DateValue]) => void;
};

const RangeDatePickerInput = ({
    value,
    onChange,
    inputProps,
    confirmButtonText = "Применить",
    popoverProps,
    className,
    ...rest
}: RangeDateInputPickerProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    const dateConfig = getDateConfig();

    const handleDateChange = useCallback(
        (val: [DateValue, DateValue]) => {
            onChange(val);

            if (isNotNil(val[0]) && isNotNil(val[1])) {
                close();
            }
        },
        [onChange, close],
    );

    const displayedValue = useMemo(
        () => buildInputValue(value, dateConfig.format),
        [value, dateConfig.format],
    );

    return (
        <Popover
            popoverProps={popoverProps}
            opened={opened}
            onClose={close}
            drawerProps={{ title: inputProps?.label, size: "lg" }}
        >
            <Popover.Target>
                <div onClick={open} className={className}>
                    <TextInput
                        {...(inputProps ?? {})}
                        value={displayedValue}
                        onChange={(val) => {
                            if (isEmpty(val)) {
                                onChange([null, null]);
                            }
                        }}
                        placeholder={inputProps?.placeholder}
                        leftSection={
                            <IconCalendar width={20} height={20} className={tw.cursor_pointer} />
                        }
                        className={styles.input}
                        label={inputProps?.label}
                        error={inputProps?.error}
                    />
                </div>
            </Popover.Target>

            <Popover.Dropdown className={tw.p_1.lg(tw.p_6)}>
                <DatePicker {...rest} type="range" value={value} onChange={handleDateChange} />
                <ConfirmButton onClick={close}>{confirmButtonText}</ConfirmButton>
            </Popover.Dropdown>
        </Popover>
    );
};

export const DatePickerInput = (props: DateInputPickerProps) => {
    if (props.type === "default") {
        return <DefaultDatePickerInput {...props} />;
    }

    return <RangeDatePickerInput {...props} />;
};
