import { forwardRef, memo } from "react";

import cx from "classnames";
import { tw } from "typewind";

import type { AvatarProps as MantineAvatarProps } from "@mantine/core";
import { Avatar as MantineAvatar, createPolymorphicComponent } from "@mantine/core";
import { IconCrown } from "@tabler/icons-react";

type AvatarSize = 32 | 48 | 64 | 96 | 128;

const crownClassNameBySize = {
    32: tw.right_["-4px"].top_["-4px"],
    48: tw.right_["-6px"].top_["-6px"],
    64: tw.right_["-8px"].top_["-8px"],
    96: tw.right_["-12px"].top_["-12px"],
    128: tw.right_["-16px"].top_["-16px"],
} as const satisfies Record<AvatarSize, string>;

export interface AvatarProps extends Pick<MantineAvatarProps, "alt"> {
    src: string | null;
    name: string;
    size: AvatarSize;
    isPremium?: boolean;
    isSilver?: boolean;
}

const _Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    ({ isPremium, isSilver, ...props }, ref) => (
        <div className={tw.relative.inline_flex.w_max.shrink_0}>
            <MantineAvatar ref={ref} color="blue" {...props} />

            {(isPremium || isSilver) && (
                <IconCrown
                    width={Math.ceil(props.size / 2)}
                    height={Math.ceil(props.size / 2)}
                    className={cx(
                        tw.absolute.z_1,
                        crownClassNameBySize[props.size],
                        isSilver && tw.fill_light_grey,
                        isPremium && tw.fill_yellow,
                    )}
                />
            )}
        </div>
    ),
);

_Avatar.displayName = "Avatar";

export const Avatar = createPolymorphicComponent<"div", AvatarProps>(memo(_Avatar));
