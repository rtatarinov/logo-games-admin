import { forwardRef, memo } from "react";

import { tw } from "typewind";

import type { CopyButtonProps as MantineCopyButtonProps } from "@mantine/core";
import { CopyButton as MantineCopyButton, createPolymorphicComponent } from "@mantine/core";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

import { ActionIcon } from "../action-icon";

export type CopyIconProps = Pick<MantineCopyButtonProps, "value" | "timeout">;

const _CopyIcon = forwardRef<HTMLButtonElement, CopyIconProps>(({ value, timeout = 2500 }, ref) => (
    <MantineCopyButton value={value} timeout={timeout}>
        {({ copied, copy }) => (
            <ActionIcon color={copied ? "teal" : "blue"} onClick={copy} ref={ref}>
                {copied ? (
                    <IconCopyCheck width={24} height={24} className={tw.text_green} />
                ) : (
                    <IconCopy width={24} height={24} className={tw.text_grey} />
                )}
            </ActionIcon>
        )}
    </MantineCopyButton>
));

_CopyIcon.displayName = "CopyIcon";

export const CopyIcon = createPolymorphicComponent<"button", CopyIconProps>(memo(_CopyIcon));
