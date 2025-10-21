import type { MantineThemeOverride } from "@mantine/core";

import { breakpoints } from "../config/breakpoints";
import { components } from "../config/components";
import { fontWeight } from "../config/typography";

export const other = {
    fontWeight,
};
export const themeBase = {
    fontFamily: '"Open Sans", sans-serif',
    components,
    primaryShade: 0,
    breakpoints,
    other,
    white: "#FFFFFF",
    black: "#1E1E1E",
} satisfies MantineThemeOverride;
