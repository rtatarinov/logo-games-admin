import type { MantineThemeOverride } from "@mantine/core";

import { themeBase } from "./base";

const createColor = (color: string) =>
    [color, color, color, color, color, color, color, color, color, color] as const;

export const lightTheme = {
    ...themeBase,
    colors: {
        white: createColor("#FFFFFF"),
        black: createColor("#1E1E1E"),
        grey: createColor("#868E96"),
        "light-grey": createColor("#F2F2F2"),
        "light-grey-hover": createColor("#E3E3E3"),
        "medium-grey": createColor("#ADB5BD"),
        "dark-grey": createColor("#828385"),
        "light-green": createColor("#ddead2"),
        green: createColor("#5c940d"),
        "green-hover": createColor("#48730b"),
        red: createColor("#F03E3E"),
        "light-red": createColor("#FFE7E7"),
        orange: createColor("#D9540D"),
        "orange-hover": createColor("#c54b0d"),
        "light-blue": createColor("#F2F7FF"),
        transparent: createColor("transparent"),
    },
} satisfies MantineThemeOverride;
