import { useScrollIntoView } from "@mantine/hooks";

import { useHeaderHeightCtx } from "@app/shared/context/header-height/HeaderHeightContext";

export const useScrollToElement = () => {
    const { headerHeight } = useHeaderHeightCtx();

    const { scrollIntoView, targetRef: ref } = useScrollIntoView<HTMLDivElement>({
        offset: headerHeight + 24,
        duration: 700,
    });

    return {
        scrollIntoView,
        ref,
    };
};
