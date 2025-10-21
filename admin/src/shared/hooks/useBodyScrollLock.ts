import { useLayoutEffect } from "react";

export const useBodyScrollLock = (lock: boolean) => {
    useLayoutEffect(() => {
        const body = document.body;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (lock) {
            body.style.overflow = "hidden";
            body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            body.style.overflow = "";
            body.style.paddingRight = "";
        }

        return () => {
            body.style.overflow = "";
            body.style.paddingRight = "";
        };
    }, [lock]);
};
