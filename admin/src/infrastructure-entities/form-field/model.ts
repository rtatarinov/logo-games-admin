import { sample } from "effector";
import { forEach, keys, values } from "ramda";

import type { ArrayField, PrimitiveField } from "@effector-reform/core";

import { createEvent } from "@app/shared/effector";

export type FormFieldModel = ReturnType<typeof createFormFieldModel>;

export const createFormFieldModel = ({
    fields,
}: {
    fields: Record<string, PrimitiveField | ArrayField<string>>;
}) => {
    const init = createEvent();
    const destroy = createEvent();

    const setErrors = createEvent<Record<string, string>>();

    forEach(
        (field) =>
            sample({
                clock: field.changed.map(() => null),
                target: field.changeError,
            }),
        values(fields),
    );

    forEach(
        (field) =>
            sample({
                clock: setErrors,
                filter: (errors) => field in errors,
                fn: (errors) => errors[field],
                target: fields[field].changeError,
            }),
        keys(fields),
    );

    forEach(
        (field) =>
            sample({
                clock: field.changed.map(() => null),
                target: field.changeError,
            }),
        values(fields),
    );

    forEach(
        (field) =>
            sample({
                clock: destroy,
                target: field.reset,
            }),
        values(fields),
    );

    return {
        init,
        destroy,
        setErrors,
    };
};
