import { useUnit } from "effector-react";
import { tw } from "typewind";

import { useMediaQuery } from "@mantine/hooks";
import { IconLogout, IconUser } from "@tabler/icons-react";

import { ActionButton, Button } from "@app/shared/ui-kit/components";
import { useTheme } from "@app/shared/ui-kit/theme";

import type { SessionModel } from "../model/session";

export const ProfileAction = ({ $$model }: { $$model: SessionModel }) => {
    const name = useUnit($$model.$name);
    const logout = useUnit($$model.$$logout.logout);

    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

    return (
        <>
            {name && (
                <ActionButton
                    buttonProps={{
                        mode: "outline",
                        color: "black",
                        className: tw.text_black.text_h3.cursor_pointer,
                        leftSection: isMobile ? null : <IconUser width={20} height={20} />,
                    }}
                    popoverProps={{ width: "target" }}
                    drawerProps={{ title: name }}
                    dropdownClassName={tw.w_auto}
                    label={isMobile ? <IconUser width={20} height={20} /> : name}
                >
                    <Button
                        color="black"
                        mode="light"
                        leftSection={<IconLogout width={20} height={20} />}
                        onClick={logout}
                    >
                        Выйти
                    </Button>
                </ActionButton>
            )}
        </>
    );
};
