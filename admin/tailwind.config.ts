/** @type {import("tailwindcss").Config} */

import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss/types/config";
import { typewindTransforms } from "typewind/transform";

import type { Colors, Texts } from "./src/shared/ui-kit/theme/config";
import { breakpoints } from "./src/shared/ui-kit/theme/config";

const colors = {
    transparent: "var(--mantine-color-transparent-0)",
    white: "var(--mantine-color-white-0)",
    black: "var(--mantine-color-black-0)",
    grey: "var(--mantine-color-grey-0)",
    "light-grey": "var(--mantine-color-light-grey-0)",
    "light-grey-hover": "var(--mantine-color-light-grey-hover-0)",
    "medium-grey": "var(--mantine-color-medium-grey-0)",
    "dark-grey": "var(--mantine-color-dark-grey-0)",
    blue: "var(--mantine-color-blue-0)",
    "blue-hover": "var(--mantine-color-blue-hover-0)",
    red: "var(--mantine-color-red-0)",
    yellow: "var(--mantine-color-yellow-0)",
    green: "var(--mantine-color-green-0)",
    "light-red": "var(--mantine-color-light-red-0)",
    orange: "var(--mantine-color-orange-0)",
    "orange-hover": "var(--mantine-color-orange-hover-0)",
    "light-blue": "var(--mantine-color-light-blue-0)",
    "light-green": "var(--mantine-color-light-green-0)",
} satisfies Record<Colors, string>;

const fontSize = {
    h1: ["32px", "38px"],
    h2: ["24px", "28px"],
    h3: ["20px", "24px"],
    h4: ["16px", "20px"],
    "body-20": ["20px", "22px"],
    "body-16": ["16px", "22px"],
    "body-14": ["14px", "18px"],
    "body-12": ["12px", "16px"],
} satisfies Record<Texts, [string, string]>;

export default {
    content: {
        files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
        transform: typewindTransforms,
    },
    theme: {
        screens: breakpoints,
        colors,
        fontSize,
    },
    plugins: [
        plugin(({ addUtilities, config, addVariant }) => {
            const { prefix = "" } = config();

            addVariant("hover-or-active", ["&:hover", "&[data-active=true]"]);
            addVariant("active", ["&[data-active=true]"]);
            addVariant("selected", ["&[data-selected=true]"]);

            addUtilities({
                ".inset-center": {
                    transform: "translate(-50%, -50%)",
                    [`@apply ${prefix}absolute ${prefix}top-1/2 ${prefix}left-1/2`]: {},
                },
                ".inset-y-center": {
                    transform: "translateY(-50%)",
                    [`@apply ${prefix}absolute ${prefix}top-1/2`]: {},
                },
                ".inset-x-center": {
                    transform: "translateX(-50%)",
                    [`@apply ${prefix}absolute ${prefix}left-1/2`]: {},
                },
                ".z-1": {
                    zIndex: "1",
                },
                ".z-2": {
                    zIndex: "2",
                },
                ".border-b-solid": {
                    borderBottomStyle: "solid",
                },
                ".border-t-solid": {
                    borderTopStyle: "solid",
                },
                ".border-l-solid": {
                    borderLeftStyle: "solid",
                },
                ".border-r-solid": {
                    borderRightStyle: "solid",
                },
            });
        }),
    ],
} satisfies Config;
