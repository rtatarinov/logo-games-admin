export const isEnumValue = <E extends Record<string, unknown>>(e: E, v: unknown): v is E[keyof E] =>
    Object.values(e).includes(v);
