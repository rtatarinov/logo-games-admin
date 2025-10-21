import cx from "classnames";
import { tw } from "typewind";

import styles from "./input.module.css";

export const buildInputClassName = ({
    withError,
    withLeftSection,
    className,
    inputClassName,
}: {
    withError: boolean;
    withLeftSection?: boolean;
    className?: string;
    inputClassName?: string;
}) => ({
    root: cx(tw.flex.flex_col.gap_3, className),
    wrapper: cx(tw.m_0.flex.items_center, {
        [tw.bg_light_red]: withError,
    }),
    input: cx(
        tw.h_8.rounded.transition_colors.px_3
            .placeholder(tw.text_dark_grey)
            .focus(tw.bg_light_grey),
        {
            [tw.border_red.bg_light_red]: withError,
            [tw.border_medium_grey]: !withError,
            [tw.pl_9]: withLeftSection,
        },
        tw.text_body_16.text_black,
        inputClassName,
        styles.input,
    ),
    section: tw.w_auto.flex_shrink_0.leading_none.text_black,
    error: tw.text_body_14.text_red,
    label: tw.text_body_14.text_black.font_medium,
    description: tw.text_body_12.text_dark_grey,
    required: tw.text_red,
    placeholder: tw.text_dark_grey,
});
