import { restore } from "effector";
import { reset } from "patronum";

import { createEvent, createStore } from "@app/shared/effector";

export type SelectModel = ReturnType<typeof createSelectModel>;

export const createSelectModel = () => {
    const init = createEvent();
    const destroy = createEvent();

    const open = createEvent();
    const close = createEvent();
    const toggle = createEvent();
    const setSearch = createEvent<string>();

    const $opened = createStore(false)
        .on(open, () => true)
        .on(close, () => false)
        .on(toggle, (state) => !state);

    const $search = restore(setSearch, "").reset(close);

    reset({
        clock: destroy,
        target: [$opened, $search],
    });

    return {
        $search,
        $opened,

        init,
        destroy,
        open,
        close,
        toggle,
        setSearch,
    };
};
