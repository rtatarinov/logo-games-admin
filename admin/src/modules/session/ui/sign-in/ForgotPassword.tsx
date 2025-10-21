import { tw } from "typewind";

import { useDisclosure } from "@mantine/hooks";
import { IconLockQuestion } from "@tabler/icons-react";

import { Popover } from "@app/shared/ui-kit/components";

export const ForgotPassword = () => {
    const [opened, { toggle, close }] = useDisclosure();

    return (
        <Popover popoverProps={{ position: "bottom-start" }} onClose={close} opened={opened}>
            <Popover.Target>
                <div
                    className={tw.inline_flex.flex.gap_2.items_center.text_grey.cursor_pointer.hover(
                        tw.text_dark_grey,
                    )}
                    onClick={toggle}
                >
                    <IconLockQuestion width={16} height={16} />
                    <span className={tw.text_body_14}>Забыли пароль?</span>
                </div>
            </Popover.Target>

            <Popover.Dropdown className={tw.text_body_14.max_w_["320px"]}>
                Свяжитесь с администратором для сброса пароля
            </Popover.Dropdown>
        </Popover>
    );
};
