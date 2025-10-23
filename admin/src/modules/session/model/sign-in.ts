import { restore, sample } from "effector";
import { reset } from "patronum";
import { z } from "zod";

import type { ValidationStrategy } from "@effector-reform/core";
import { createField, createForm } from "@effector-reform/core";
import { zodAdapter } from "@effector-reform/zod";
import type { InvalidDataError } from "@farfetched/core";

import { createEvent, createStore } from "@app/shared/effector";
import { buildFormErrors, stringifyViolationError } from "@app/shared/lib/form";
import { homeRoute } from "@app/shared/routing";
import { ValidationErrorEnum } from "@app/shared/types/validation";

import { buildSignInMutation } from "../api";

export type SignInModel = ReturnType<typeof createSignInModel>;

export enum FieldNames {
    email = "email",
    password = "password",
}

const schema = z.object({
    [FieldNames.email]: z
        .string()
        .nonempty(
            stringifyViolationError({ name: FieldNames.email, code: ValidationErrorEnum.Required }),
        ),
    [FieldNames.password]: z.string().nonempty(
        stringifyViolationError({
            name: FieldNames.password,
            code: ValidationErrorEnum.Required,
        }),
    ),
});

export const createSignInModel = () => {
    const init = createEvent();
    const destroy = createEvent();

    const signIn = createEvent();
    const updateValidationStrategies = createEvent<ValidationStrategy[]>();

    const mutation = buildSignInMutation();

    const $serverError = createStore<{
        params: unknown;
        error: Error | InvalidDataError;
        meta: unknown;
    } | null>(null).on(mutation.finished.failure, (_, error) => error);

    const $validationStrategies = restore(updateValidationStrategies, ["submit"] as const);

    const $form = createForm({
        schema: {
            [FieldNames.email]: createField<string>(""),
            [FieldNames.password]: createField<string>(""),
        },
        validation: zodAdapter(schema),
        validationStrategies: $validationStrategies,
    });

    const $errors = buildFormErrors({
        $serverError,
        $formErrors: $form.$errors,
        $formFields: $form.fields,
    });

    sample({
        clock: $form.submitted,
        fn: (): ValidationStrategy[] => ["blur", "focus", "change", "submit"],
        target: updateValidationStrategies,
    });

    sample({
        clock: $form.validatedAndSubmitted,
        fn: (loginAdminDto) => ({ loginAdminDto }),
        target: mutation.start,
    });

    sample({
        clock: mutation.finished.success,
        target: [destroy, homeRoute.open],
    });

    sample({
        clock: destroy,
        target: [$form.reset, mutation.reset],
    });

    reset({
        clock: destroy,
        target: [$serverError, $validationStrategies],
    });

    return {
        $form,
        $errors,
        $isLoading: mutation.$pending,

        mutation,

        init,
        destroy,
        signIn,
    };
};
