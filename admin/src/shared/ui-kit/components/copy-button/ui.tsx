import type { ReactNode } from "react";
import { forwardRef, memo } from "react";

import type { CopyButtonProps as MantineCopyButtonProps } from "@mantine/core";
import { CopyButton as MantineCopyButton, createPolymorphicComponent } from "@mantine/core";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

import { Button } from "@app/shared/ui-kit/components";

export type CopyButtonProps = Pick<MantineCopyButtonProps, "value" | "timeout"> & {
    text: ReactNode;
    copiedText: ReactNode;
};

const _CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
    ({ value, text, copiedText, timeout = 2500 }, ref) => (
        <MantineCopyButton value={value} timeout={timeout}>
            {({ copied, copy }) => (
                <Button
                    leftSection={
                        copied ? (
                            <IconCopyCheck width={24} height={24} />
                        ) : (
                            <IconCopy width={24} height={24} />
                        )
                    }
                    onClick={copy}
                    ref={ref}
                >
                    {copied ? copiedText : text}
                </Button>
            )}
        </MantineCopyButton>
    ),
);

_CopyButton.displayName = "CopyIcon";

export const CopyButton = createPolymorphicComponent<"button", CopyButtonProps>(memo(_CopyButton));
