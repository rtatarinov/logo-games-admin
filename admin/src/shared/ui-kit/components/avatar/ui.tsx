import { forwardRef, memo } from "react";

import type { AvatarProps as MantineAvatarProps } from "@mantine/core";
import { Avatar as MantineAvatar, createPolymorphicComponent } from "@mantine/core";

export interface AvatarProps extends Pick<MantineAvatarProps, "alt"> {
    src: string | null;
    name: string;
    size: 32 | 48 | 64;
}

const _Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => (
    <MantineAvatar ref={ref} color="blue" {...props} />
));

_Avatar.displayName = "Avatar";

export const Avatar = createPolymorphicComponent<"div", AvatarProps>(memo(_Avatar));
