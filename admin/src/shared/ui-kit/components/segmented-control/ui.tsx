import type { ReactNode, Ref } from "react";
import { forwardRef, memo, useCallback, useMemo } from "react";

import cx from "classnames";
import { indexBy, isNotNil, prop } from "ramda";
import { tw } from "typewind";

import type { SegmentedControlProps as MantineSegmentedControlProps } from "@mantine/core";
import {
    createPolymorphicComponent,
    SegmentedControl as MantineSegmentedControl,
} from "@mantine/core";

import { buildInputClassName } from "../input/lib";

export interface SegmentedControlItem {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}

export interface SegmentedControlProps
    extends Pick<MantineSegmentedControlProps, "name" | "className"> {
    value: string;
    onChange: (value: SegmentedControlItem) => void;
    data: SegmentedControlItem[];
    required?: boolean;
    disabled?: boolean;
    label?: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
}

const _SegmentedControl = forwardRef(
    (
        {
            label,
            description,
            required,
            className,
            onChange,
            data,
            error,
            ...rest
        }: SegmentedControlProps,
        ref: Ref<HTMLDivElement>,
    ) => {
        const dataByValue = useMemo(() => indexBy(prop("value"), data), [data]);

        const handleChange = useCallback(
            (val: string) => {
                onChange(dataByValue[val]);
            },
            [dataByValue, onChange],
        );

        const inputClassName = buildInputClassName({
            withError: isNotNil(error),
        });

        return (
            <div className={cx(inputClassName.root, className)}>
                {label && (
                    <label className={inputClassName.label}>
                        {label}
                        {required && <span className={cx(inputClassName.error, tw.pl_1)}>*</span>}
                    </label>
                )}

                {description && <p className={inputClassName.description}>{description}</p>}

                <MantineSegmentedControl
                    ref={ref}
                    onChange={(val) => handleChange(val)}
                    data={data}
                    classNames={{
                        root: tw.bg_light_green.p_[1.5],
                        indicator: tw.bg_green,
                        label: tw.text_black.font_semibold.text_body_16.active(tw.text_white),
                    }}
                    {...rest}
                />

                {error && <div className={inputClassName.error}>{error}</div>}
            </div>
        );
    },
);

_SegmentedControl.displayName = "SegmentedControl";

export const SegmentedControl = createPolymorphicComponent<"div", SegmentedControlProps>(
    memo(_SegmentedControl),
);
