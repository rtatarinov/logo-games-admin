import type { ReactNode } from "react";

import { toPairs } from "ramda";
import { tw } from "typewind";

import type { StoryObj } from "@storybook/react";

import { useTheme } from "@app/shared/ui-kit/theme";
import type { Texts } from "@app/shared/ui-kit/theme/config";

const meta = {
    title: "Design system/Text",
    tags: ["autodocs"],
};

export default meta;

const fontSizesConfig = {
    h1: {
        className: tw.text_h1,
        children: "Heading H1",
    },
    h2: {
        className: tw.text_h2,
        children: "Heading H2",
    },
    h3: {
        className: tw.text_h3,
        children: "Heading H3",
    },
    h4: {
        className: tw.text_h4,
        children: "Heading H4",
    },
    "body-20": {
        className: tw.text_body_20,
        children: "Body 20",
    },
    "body-16": {
        className: tw.text_body_16,
        children: "Body 16",
    },
    "body-14": {
        className: tw.text_body_14,
        children: "Body 14",
    },
    "body-12": {
        className: tw.text_body_12,
        children: "Body 12",
    },
} as const satisfies Record<Texts, { className: string; children: ReactNode }>;

export const Text: StoryObj = {
    render: () => {
        const { other } = useTheme();

        return (
            <div className={tw.text_black.flex.flex_col.gap_4}>
                <h1 className={tw.text_h1.mt_0.mb_0}>Typography</h1>

                <div className={tw.mb_8}>
                    <a
                        href="https://www.figma.com/design/ckUB1e18nnA30aKIQTdcrw/ZooTech?node-id=57-87&t=ZsRbqjRmtmEXsm7v-4"
                        target="_blank"
                        rel="noreferrer"
                        className={tw.text_orange.text_h2.font_semibold.underline.hover(
                            tw.no_underline,
                        )}
                    >
                        Figma
                    </a>
                </div>

                <div>
                    <h2 className={tw.text_h2.text_blue.m_0}>Font family</h2>

                    <ul>
                        <li>Open Sans</li>
                    </ul>
                </div>

                <div>
                    <h2 className={tw.text_h2.text_blue.m_0}>Font weights</h2>

                    <ul>
                        {toPairs(other.fontWeight).map(([key, weight]) => (
                            <li className={tw.font_normal} key={key}>
                                {key} {weight}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={tw.flex.flex_col.gap_10}>
                    <h2 className={tw.text_h2.text_blue.m_0}>Font sizes</h2>

                    <ul className={tw.list_none.m_0.p_0.flex.flex_col.gap_4}>
                        {Object.entries(fontSizesConfig).map(([key, item]) => (
                            <li key={key} className={item.className}>
                                {item.children}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    },
};
