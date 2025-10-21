import type { ImgHTMLAttributes } from "react";
import { memo } from "react";

export type LogoMode = "full" | "symbol";

import type { Except } from "type-fest";

import Full from "./icons/full.svg?url";
import Symbol from "./icons/symbol.svg?url";

export interface LogoProps
    extends Except<ImgHTMLAttributes<HTMLElement>, "src" | "width" | "height"> {
    mode: LogoMode;
    width: number;
    height: number;
}

const logoImageByMode = {
    full: Full,
    symbol: Symbol,
} as const satisfies Record<LogoMode, string>;

const _Logo = ({ mode, width, height, ...rest }: LogoProps) => {
    const src = logoImageByMode[mode];

    return <img alt="Двор.КРС" src={src} width={width} height={height} {...rest} />;
};

export const Logo = memo(_Logo);
