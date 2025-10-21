import type { ReactNode } from "react";
import { useMemo } from "react";

import type { Except } from "type-fest";

import type { MantineColorSchemeManager } from "@mantine/core";
import { MantineProvider } from "@mantine/core";

import { DatesProvider } from "@app/shared/ui-kit/providers/dates-provider";
import { lightTheme } from "@app/shared/ui-kit/theme/themes";

export type ThemeProviderProps = {
    children: ReactNode;
    theme: "light" | "dark";
    withGlobalFonts?: boolean;
    withResetStyles?: boolean;
    withGlobalClasses?: boolean;
    datesSettings?: Except<DatesProvider, "children">;
};

const noopColorSchemeManager = {
    dark: {
        get() {
            return "dark";
        },
        set() {
            // noop
        },
        subscribe() {
            // noop
        },
        unsubscribe() {
            // noop
        },
        clear() {
            // noop
        },
    },
    light: {
        get() {
            return "light";
        },
        set() {
            // noop
        },
        subscribe() {
            // noop
        },
        unsubscribe() {
            // noop
        },
        clear() {
            // noop
        },
    },
} as const satisfies Record<"light" | "dark", MantineColorSchemeManager>;

export const ThemeProvider = ({
    children,
    theme,
    withGlobalClasses = false,
    datesSettings,
    ...themeOverrides
}: ThemeProviderProps) => {
    const themeObject = useMemo(() => {
        return {
            theme,
            ...lightTheme,
            ...themeOverrides,
        };
    }, [theme, themeOverrides]);

    return (
        <MantineProvider
            theme={themeObject}
            withGlobalClasses={withGlobalClasses}
            forceColorScheme={theme}
            colorSchemeManager={noopColorSchemeManager[theme]}
        >
            <DatesProvider {...datesSettings}>{children}</DatesProvider>
        </MantineProvider>
    );
};
