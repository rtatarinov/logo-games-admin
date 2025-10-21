import type { ReactNode } from "react";
import { forwardRef, memo, useMemo } from "react";

import { isNil } from "ramda";
import { tw } from "typewind";

import type { DrawerProps as MantineDrawerProps } from "@mantine/core";
import { createPolymorphicComponent, Drawer as MantineDrawer } from "@mantine/core";
import { IconArrowLeft, IconX } from "@tabler/icons-react";

import { ActionIcon } from "../action-icon";
import { modalClassNames } from "./constants";

export interface ModalProps
    extends Pick<
        MantineDrawerProps,
        | "opened"
        | "onClose"
        | "closeOnClickOutside"
        | "closeOnEscape"
        | "keepMounted"
        | "title"
        | "withCloseButton"
        | "withinPortal"
        | "transitionProps"
    > {
    children: ReactNode;
    onBack?: () => void;
}

const _Modal = forwardRef<HTMLDivElement, ModalProps>(
    (
        { children, closeOnClickOutside = false, closeOnEscape = false, onBack, title, ...rest },
        ref,
    ) => {
        const titleBlock = useMemo(() => {
            if (isNil(onBack)) {
                return title;
            }

            return (
                <div className={tw.flex.items_center}>
                    <ActionIcon onClick={onBack}>
                        <IconArrowLeft width={20} height={20} />
                    </ActionIcon>

                    <span onClick={onBack} className={tw.cursor_pointer.pl_2}>
                        {title}
                    </span>
                </div>
            );
        }, [onBack, title]);

        return (
            <MantineDrawer
                {...rest}
                ref={ref}
                title={titleBlock}
                classNames={modalClassNames}
                closeButtonProps={{
                    icon: (
                        <IconX
                            width={24}
                            height={24}
                            className={tw.text_black.hover_or_active(tw.text_green)}
                        />
                    ),
                }}
                position="right"
                closeOnClickOutside={closeOnClickOutside}
                closeOnEscape={closeOnEscape}
            >
                {children}
            </MantineDrawer>
        );
    },
);

_Modal.displayName = "Modal";

export const Modal = createPolymorphicComponent<"div", ModalProps>(memo(_Modal));
