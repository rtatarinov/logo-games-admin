import { useCallback, useRef, useState } from "react";

import { isNotNil } from "ramda";

export const useCursorPosition = () => {
    const [cursorPosition, setCursorPosition] = useState(0);

    const ref = useRef<HTMLInputElement>(null);

    const saveCursorPosition = useCallback(
        (position?: number) => {
            if (ref.current) {
                setCursorPosition(isNotNil(position) ? position : ref.current.selectionStart || 0);
            }
        },
        [ref],
    );

    const restoreCursorPosition = useCallback(() => {
        if (ref.current) {
            ref.current.setSelectionRange(cursorPosition, cursorPosition);
        }
    }, [ref, cursorPosition]);

    return { cursorPosition, saveCursorPosition, restoreCursorPosition, ref };
};
