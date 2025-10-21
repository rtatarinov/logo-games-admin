import cx from "classnames";
import { toPairs } from "ramda";
import { tw } from "typewind";

import type { Meta, StoryObj } from "@storybook/react";

import type { Colors as ThemeColors } from "@app/shared/ui-kit/theme";
import { useTheme } from "@app/shared/ui-kit/theme";

const meta: Meta = {
    title: "Design system/Colors",
    tags: ["autodocs"],
};

export default meta;

const config = {
    white: "bg-white",
    black: "bg-black",
    grey: "bg-grey",
    "light-grey": "bg-light-grey",
    "light-grey-hover": "bg-light-grey-hover",
    "medium-grey": "bg-medium-grey",
    "dark-grey": "bg-dark-grey",
    green: "bg-green",
    "green-hover": "bg-green-hover",
    red: "bg-red",
    "light-red": "bg-light-red",
    orange: "bg-orange",
    "orange-hover": "bg-orange-hover",
    "light-blue": "bg-light-blue",
    "light-green": "bg-light-green",
    transparent: "bg-transparent",
} as const satisfies Record<ThemeColors, string>;

export const Colors: StoryObj = {
    render: () => {
        const theme = useTheme();

        return (
            <div className={tw.text_black.flex.flex_col.gap_4}>
                <h1 className={tw.text_h1.mt_0.mb_0}>Colors</h1>

                <div className={tw.mb_8}>
                    <a
                        href="https://www.figma.com/design/ckUB1e18nnA30aKIQTdcrw/ZooTech?node-id=52-64&t=ZsRbqjRmtmEXsm7v-4"
                        className={tw.text_orange.text_h2.font_semibold.underline.hover(
                            tw.no_underline,
                        )}
                    >
                        Figma
                    </a>
                </div>

                <div className={tw.flex.flex_wrap.gap_8}>
                    {toPairs(config).map(([color, className]) => (
                        <div key={color} className={tw.flex.flex_col.items_center.gap_2}>
                            <div className={cx(tw.w_32.h_32, className)} />

                            <div className={tw.flex.flex_col.gap_2.items_center}>
                                <div className={tw.text_body_14.font_semibold}>{color}</div>

                                <div className={tw.text_grey.text_body_12}>
                                    {theme.colors[color]?.[0]}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
};
