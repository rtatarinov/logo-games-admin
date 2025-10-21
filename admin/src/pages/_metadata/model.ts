import { sample } from "effector";

import { createEffect, createEvent } from "@app/shared/effector";

const mainTitle = "Logo-games — Панель администрирования";
const titlePostfix = ` | ${mainTitle}`;

export const createPageMetaModel = () => {
    const init = createEvent<{ title: string; disabledTitlePostfix?: boolean }>();
    const destroy = createEvent();
    const updateTitle = createEvent<{ title: string; disabledTitlePostfix?: boolean }>();

    const updateDocumentTitleFx = createEffect<string, void, void>((title) => {
        document.title = title;
    });

    sample({
        clock: init,
        target: updateTitle,
    });

    sample({
        clock: destroy,
        fn: () => ({ title: mainTitle }),
        target: updateTitle,
    });

    sample({
        clock: updateTitle,
        fn: ({ title, disabledTitlePostfix }) =>
            `${title}${disabledTitlePostfix ? "" : titlePostfix}`,
        target: updateDocumentTitleFx,
    });

    return { init, destroy, updateTitle };
};
