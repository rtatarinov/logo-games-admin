import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

import { isNil } from "ramda";

type HeaderHeightContextValue = {
    headerHeight: number;
    setHeaderHeight: (height: number) => void;
};

const HeaderHeightContext = createContext<HeaderHeightContextValue | undefined>(undefined);

export const useHeaderHeightCtx = () => {
    const ctx = useContext(HeaderHeightContext);

    if (isNil(ctx)) {
        throw new Error("useHeaderHeightCtx must be used within HeaderHeightProvider");
    }

    return ctx;
};

export const HeaderHeightProvider = ({ children }: { children: ReactNode }) => {
    const [headerHeight, setHeaderHeight] = useState(0);

    return (
        <HeaderHeightContext.Provider value={{ headerHeight, setHeaderHeight }}>
            {children}
        </HeaderHeightContext.Provider>
    );
};
