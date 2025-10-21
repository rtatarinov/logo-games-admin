import { isNotEmpty, isNotNil, pickBy } from "ramda";

type NonNullable<T> = T extends null | undefined | "" ? never : T;

type PickDefined<T> = {
    [K in keyof T as T[K] extends null | undefined | "" ? never : K]: NonNullable<T[K]>;
};

const isNonEmptyStr = (val: unknown): val is NonNullable<unknown> =>
    typeof val === "string" ? isNotEmpty(val) : true;

export const pickDefined = <T extends object>(obj: T): PickDefined<T> =>
    pickBy((val) => isNotNil(val) && isNonEmptyStr(val), obj);
