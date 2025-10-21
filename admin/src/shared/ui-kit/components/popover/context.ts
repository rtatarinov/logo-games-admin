import type { ReactNode } from "react";
import { createContext } from "react";

import type { PopoverDrawerProps } from "./types";

type Context = {
    opened: boolean;
    onClose: () => void;
    required: boolean;
    disabled: boolean;
    drawerProps?: PopoverDrawerProps;
    error?: ReactNode;
};

const initialContext: Context = {
    opened: false,
    required: false,
    disabled: false,
    onClose: (): void => {
        throw new Error("onClose function must be overridden");
    },
};

export const PopoverContext = createContext(initialContext);
