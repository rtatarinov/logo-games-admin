import { isNil, isNotNil } from "ramda";

import { formatDate } from "@app/shared/lib/date-and-time";
import type { DateValue } from "@app/shared/ui-kit/components/date-picker";

export const buildInputValue = (value: DateValue | [DateValue, DateValue], format?: string) => {
    if (!Array.isArray(value)) {
        if (isNil(value)) {
            return "";
        }

        return formatDate(value, format);
    }

    const [start, end] = value;

    if (isNotNil(start) && isNil(end)) {
        return `${formatDate(start, format)} —`;
    } else if (isNil(start) && isNotNil(end)) {
        return `— ${formatDate(end, format)}`;
    } else if (isNotNil(start) && isNotNil(end)) {
        return `${formatDate(start, format)} — ${formatDate(end, format)}`;
    } else {
        return "";
    }
};
