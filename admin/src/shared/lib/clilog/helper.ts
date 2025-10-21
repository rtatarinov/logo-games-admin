export const maybeError = (err: unknown): undefined | Error => {
    if (err instanceof Error) {
        return err;
    }

    return undefined;
};

export const reasonText = (r: unknown, prefix: string = ": "): string => {
    if (typeof r === "string") {
        if (r !== "") {
            return `${prefix}${r}`;
        }

        return "";
    }

    if (typeof r === "number" || typeof r === "boolean") {
        return `${prefix}${r.toString()}`;
    }

    if (r instanceof Error) {
        if (r.message !== "") {
            return `${prefix}${r.message}`;
        }

        return "";
    }

    return "";
};
