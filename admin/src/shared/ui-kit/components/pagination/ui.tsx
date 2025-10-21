import { forwardRef, memo } from "react";

import { tw } from "typewind";

import type { PaginationProps as MantinePaginationProps } from "@mantine/core";
import { createPolymorphicComponent, Pagination as MantinePagination } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export interface PaginationProps
    extends Pick<MantinePaginationProps, "disabled" | "total" | "getItemProps"> {
    value: number;
    onChange: (val: number) => void;
    className?: string;
}

const _Pagination = forwardRef<HTMLDivElement, PaginationProps>(({ className, ...rest }, ref) => (
    <MantinePagination
        ref={ref}
        classNames={{
            root: className,
            control: tw.w_8.h_8.rounded.border_black.text_black.text_body_16.font_semibold
                .active(tw.bg_green.text_white.border_green)
                .hover(tw.bg_light_grey),
        }}
        previousIcon={IconChevronLeft}
        nextIcon={IconChevronRight}
        {...rest}
    />
));

_Pagination.displayName = "Pagination";

export const Pagination = createPolymorphicComponent<"div", PaginationProps>(memo(_Pagination));
