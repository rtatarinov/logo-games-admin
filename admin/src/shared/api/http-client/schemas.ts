import { z } from "zod";

import { HttpErrorStatus } from "@app/shared/api/http-client/http-client";
import { ValidationErrorEnum } from "@app/shared/types/validation";

export const minLengthSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.MinLength),
    payload: z.object({ value: z.number() }),
});

export const maxLengthSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.MaxLength),
    payload: z.object({ value: z.number() }),
});

export const minSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.Min),
    payload: z.object({ value: z.number() }),
});

export const maxSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.Max),
    payload: z.object({ value: z.number() }),
});

export const requiredSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.Required),
});

export const relationSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.Relation),
});

export const enumSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.Enum),
});

export const beforeSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.Before),
    payload: z.object({ value: z.string() }),
});

export const charSchema = z.object({
    name: z.string(),
    code: z.literal(ValidationErrorEnum.Chars),
});

export const violationSchema = z.union([
    requiredSchema,
    minLengthSchema,
    maxLengthSchema,
    relationSchema,
    enumSchema,
    minSchema,
    maxSchema,
    beforeSchema,
    charSchema,
]);

export const errorBaseSchema = z.object({
    message: z.string(),
    status: z.enum(HttpErrorStatus),
});

export const error400Schema = z.object({
    msg: z.string(),
    violations: z.array(violationSchema),
});

export const contractSchema = z.object({
    validationErrors: z.array(z.string()),
    response: z
        .object({
            id: z.uuid(),
            name: z.string(),
        })
        .optional(),
    errorType: z.literal("INVALID_DATA"),
    explanation: z.string(),
});

export type ResponseErrorBase = z.infer<typeof errorBaseSchema>;
export type ViolationError = z.infer<typeof violationSchema>;
export type ResponseError400 = z.infer<typeof error400Schema>;
export type ResponseContractError = z.infer<typeof contractSchema>;
export type ResponseError = ResponseErrorBase | ResponseError400 | ResponseContractError;
