import type { ReactNode } from "react";

import type { DatesProviderSettings } from "@mantine/dates";
import { DatesProvider as MantineDatesProvider } from "@mantine/dates";

export interface DatesProvider extends DatesProviderSettings {
    children: ReactNode;
}

export const DatesProvider = ({ children, ...rest }: DatesProvider) => (
    <MantineDatesProvider
        settings={{
            locale: "ru",
            consistentWeeks: true,
            ...rest,
        }}
    >
        {children}
    </MantineDatesProvider>
);
