import { tw } from "typewind";

export const modalClassNames = {
    content: tw.min_w_["100vw"].lg(tw.min_w_["640px"].w_auto),
    body: tw.px_4.pb_8.lg(tw.px_8),
    header: tw.gap_4.px_4.pb_8.bg_white.lg(tw.p_8),
    title: tw.text_h3.text_black.font_semibold,
    close: tw.border_none.bg_transparent.outline_none
        .hover_or_active(tw.bg_transparent.outline_none.border_none)
        .focus(tw.bg_transparent.outline_none.border_none),
} as const;
