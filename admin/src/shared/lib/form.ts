import type { Store } from "effector";
import { combine } from "effector";
import { assocPath, fromPairs, isNil, isNotNil, toPairs } from "ramda";
import type { Jsonify } from "type-fest";
import type { z } from "zod";
import { util } from "zod";

import type { FieldError, ReadyFieldsGroupSchema } from "@effector-reform/core";
import type { InvalidDataError } from "@farfetched/core";

import type { ViolationError } from "@app/shared/api/http-client/schemas";
import { error400Schema, violationSchema } from "@app/shared/api/http-client/schemas";
import { doesSatisfySchema } from "@app/shared/lib/does-satisfy-schema";
import { groupViolationsByFieldName } from "@app/shared/lib/map-server-errors";
import { ValidationErrorEnum } from "@app/shared/types/validation";

export const stringifyViolationError = (error: Jsonify<ViolationError>) => JSON.stringify(error);

export const parseViolationError = (strError: string): ViolationError => {
    const parsed: unknown = JSON.parse(strError);

    if (doesSatisfySchema(violationSchema)(parsed)) {
        return parsed;
    } else {
        throw new Error("Invalid ViolationError");
    }
};

const mapError = (clientError: string | null, serverError?: ViolationError[]) => {
    if (isNotNil(clientError)) {
        return parseViolationError(clientError);
    } else if (isNotNil(serverError)) {
        return serverError[0];
    } else {
        return null;
    }
};

export const buildFormErrors = <
    TFields extends ReadyFieldsGroupSchema,
    TErrors extends Store<Record<string, FieldError | { error: FieldError; errors: unknown[] }>>,
>({
    $serverError,
    $formErrors,
    $formFields,
}: {
    $serverError: Store<{
        params: unknown;
        error: Error | InvalidDataError;
        meta: unknown;
    } | null>;
    $formErrors: TErrors;
    $formFields: TFields;
}) => {
    const $serverFormError = $serverError.map((payload) =>
        !isNil(payload) && doesSatisfySchema(error400Schema)(payload.error)
            ? groupViolationsByFieldName(payload.error.violations)
            : null,
    );

    const $isNonFormError = $serverError.map(
        (payload) => !isNil(payload) && !doesSatisfySchema(error400Schema)(payload.error),
    );

    const $clientErrorsNormalized = $formErrors.map((errors) =>
        fromPairs(
            toPairs(errors).map(([k, v]) => [k, typeof v === "string" ? v : (v?.error ?? null)]),
        ),
    );

    return combine(
        $serverFormError,
        $clientErrorsNormalized,
        $formFields,
        $isNonFormError,
        $serverError,
        (serverFormErrors, clientErrorsValue, formFields, isNonFormError, serverError) => {
            const form = fromPairs(
                toPairs(formFields).map(([k]) => [
                    k,
                    mapError(clientErrorsValue[k], serverFormErrors?.[k]),
                ]),
            );

            return {
                form,
                isNonFormError,
                error: serverError?.error ?? null,
            };
        },
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorMessageFn = (...args: any[]) => string;

const defaultErrorMessages = {
    [ValidationErrorEnum.Required]: () => "Обязательное поле",
    [ValidationErrorEnum.MinLength]: () => "Слишком короткое значение",
    [ValidationErrorEnum.MaxLength]: () => "Слишком длинное значение",
    [ValidationErrorEnum.Relation]: () => "Некорректное значение",
    [ValidationErrorEnum.Enum]: () => "Недопустимое значение, выберите одно из доступных",
    [ValidationErrorEnum.Min]: () => "Слишком маленькое значение",
    [ValidationErrorEnum.Max]: () => "Слишком большое значение",
    [ValidationErrorEnum.Before]: () => "Недопустимая дата",
    [ValidationErrorEnum.Chars]: () => "Недопустимые символы",
} satisfies Record<ValidationErrorEnum, ErrorMessageFn>;

const buildErrorMessages = (
    messages: Partial<Record<ValidationErrorEnum, ErrorMessageFn>>,
): Record<ValidationErrorEnum, ErrorMessageFn> => Object.assign(defaultErrorMessages, messages);

export const getFieldError = (
    error: ViolationError | null,
    errorMessages: Partial<Record<ValidationErrorEnum, ErrorMessageFn>>,
) => {
    if (isNotNil(error)) {
        const messages = buildErrorMessages(errorMessages);
        const messageByErrorCode = messages[error.code];

        switch (error.code) {
            case ValidationErrorEnum.Required:
            case ValidationErrorEnum.Relation:
            case ValidationErrorEnum.Enum:
            case ValidationErrorEnum.Chars:
                return messageByErrorCode();

            case ValidationErrorEnum.MinLength:
            case ValidationErrorEnum.MaxLength:
            case ValidationErrorEnum.Min:
            case ValidationErrorEnum.Max:
            case ValidationErrorEnum.Before:
                return messageByErrorCode(error.payload.value);

            default:
                util.assertNever(error);
        }
    }
};

export const transformZodError = (zodErrors: z.core.$ZodIssue[]) =>
    zodErrors.reduce<Record<string, string>>((acc, { path, message }) => {
        if (path.length > 0) {
            return assocPath(
                path.map((k) => (typeof k === "symbol" ? k.toString() : k)),
                message,
                acc,
            );
        }

        return acc;
    }, {});
