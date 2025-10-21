import { isNotNil } from "ramda";

import { log } from "@app/shared/lib/clilog";

export const notYetImplemented = <T extends string | number, R>(t: T, r: R, context?: string) => {
    log.warning(`Not yet implemented${isNotNil(context) ? ` (${context})` : ""}: ${t}`);

    return r;
};
