import type { z } from "zod";

export const doesSatisfySchema =
    <T>(schema: z.Schema<T>) =>
    (data: unknown): data is T =>
        schema.safeParse(data).success;
