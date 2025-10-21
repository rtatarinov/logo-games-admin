import type { ChangeEvent } from "react";
import { forwardRef, memo } from "react";

import cx from "classnames";
import { isNotNil } from "ramda";
import { tw } from "typewind";

import type { TextareaProps as MantineTextareaProps } from "@mantine/core";
import { createPolymorphicComponent, Textarea as MantineTextarea } from "@mantine/core";

import { buildInputClassName } from "../input/lib";

export interface TextareaProps
    extends Pick<
        MantineTextareaProps,
        | "placeholder"
        | "size"
        | "value"
        | "disabled"
        | "label"
        | "error"
        | "autosize"
        | "description"
        | "required"
    > {
    onChange: (value: string, evt?: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
}

const _Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        { className, size = "md", placeholder, value, onChange, error, autosize = true, ...rest },
        ref,
    ) => {
        const inputClassName = buildInputClassName({
            withError: isNotNil(error),
        });

        return (
            <MantineTextarea
                classNames={{
                    ...inputClassName,
                    root: cx(tw.flex.flex_col.gap_3, className),
                    input: cx(inputClassName.input, tw.h_auto.min_h_24),
                }}
                placeholder={placeholder}
                error={error}
                variant="unstyled"
                size={size}
                value={value}
                onChange={(event) => onChange(event.currentTarget.value, event)}
                autosize={autosize}
                ref={ref}
                {...rest}
            />
        );
    },
);

_Textarea.displayName = "Textarea";

export const Textarea = createPolymorphicComponent<"div", TextareaProps>(memo(_Textarea));
