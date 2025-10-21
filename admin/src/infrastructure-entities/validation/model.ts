import type { EventCallable, Store } from "effector";
import { createAction } from "effector-action";
import type { z } from "zod";

import { createEvent } from "@app/shared/effector";
import { transformZodError } from "@app/shared/lib/form";

export type ValidationModel = ReturnType<typeof createValidationModel>;

export const createValidationModel = <T extends object>({
    $formData,
    $validationSchema,
    submit,
}: {
    $formData: Store<T | null>;
    $validationSchema: Store<z.ZodType<Record<string, unknown>>>;
    submit: EventCallable<void>;
}) => {
    const init = createEvent();
    const destroy = createEvent();

    const setErrors = createEvent<Record<keyof T & string, string>>();

    const validateAndSubmit = createAction({
        source: {
            formData: $formData,
            validationSchema: $validationSchema,
        },
        target: {
            setErrors,
            submit,
        },
        fn: (target, { formData, validationSchema }) => {
            const parsedFormData = validationSchema.safeParse(formData ?? {});

            if (parsedFormData.success) {
                target.submit();
            } else {
                const zodErrors = parsedFormData.error?.issues ?? [];

                if (zodErrors.length > 0) {
                    target.setErrors(transformZodError(zodErrors));
                }
            }
        },
    });

    return {
        init,
        destroy,
        setErrors,
        validateAndSubmit,
    };
};
