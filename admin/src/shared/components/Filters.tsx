import type { ReactNode } from "react";

import cx from "classnames";
import { isNotNil } from "ramda";
import { tw } from "typewind";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconFilter, IconX } from "@tabler/icons-react";

import { useHeaderHeightCtx } from "@app/shared/context/header-height/HeaderHeightContext";
import { useBodyScrollLock } from "@app/shared/hooks/useBodyScrollLock";
import type { ButtonProps } from "@app/shared/ui-kit/components";
import { ActionIcon, Button } from "@app/shared/ui-kit/components";
import { useTheme } from "@app/shared/ui-kit/theme";

import styles from "./filters.module.css";

type Props = {
    children: ReactNode;
    label?: ReactNode;
    actions?: ButtonProps[];
};

export const Filters = ({ children, label, actions }: Props) => {
    const [opened, { open, close }] = useDisclosure(false);

    const { headerHeight } = useHeaderHeightCtx();

    const displayedLabel = label ?? "Фильтры";

    useBodyScrollLock(opened);

    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

    if (isMobile) {
        return (
            <>
                <Button
                    color="orange"
                    mode="outline"
                    onClick={open}
                    leftSection={<IconFilter width={20} height={20} />}
                >
                    {displayedLabel}
                </Button>

                <div
                    className={cx(
                        tw.bg_white.w_screen.fixed.left_0.z_2.flex.flex_col.gap_4.p_4
                            .transition_transform.overflow_y_auto,
                        opened ? styles.opened : styles.closed,
                    )}
                    style={{ top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}
                >
                    <div className={tw.flex.justify_between.items_center}>
                        <h4 className={tw.text_h3.m_0}>{displayedLabel}</h4>

                        <ActionIcon onClick={close}>
                            <IconX width={24} height={24} />
                        </ActionIcon>
                    </div>

                    {children}

                    {isNotNil(actions) && (
                        <div className={tw.flex.flex_col.gap_2}>
                            {actions.map((action, index) => (
                                <Button
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={index}
                                    {...action}
                                    onClick={() => {
                                        if (action.onClick) {
                                            action.onClick();
                                        }

                                        close();
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    }

    return <>{children}</>;
};
