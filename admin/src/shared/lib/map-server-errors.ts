import { isNotNil } from "ramda";

import type { ViolationError } from "@app/shared/api/http-client/schemas";

export type GroupedViolationError = Partial<Record<string, ViolationError[]>>;

export const groupViolationsByFieldName = (violations: ViolationError[]) =>
    violations.reduce<GroupedViolationError>((acc, violation) => {
        const { name } = violation;

        if (isNotNil(acc[name])) {
            acc[name].push(violation);
        } else {
            acc[name] = [violation];
        }

        return acc;
    }, {});
