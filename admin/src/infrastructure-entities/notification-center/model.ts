import type { NotificationData } from "@mantine/notifications";
import { notifications } from "@mantine/notifications";

import { createEffect, createEvent } from "@app/shared/effector";

export type NotificationModel = ReturnType<typeof createNotificationModel>;

export const createNotificationModel = () => {
    const init = createEvent();
    const destroy = createEvent();

    const showFx = createEffect((notificationParams: NotificationData) =>
        notifications.show({
            autoClose: 3500,
            withBorder: true,
            withCloseButton: true,
            ...notificationParams,
        }),
    );

    const updateFx = createEffect((notificationParams: NotificationData) =>
        notifications.update(notificationParams),
    );

    const hideFx = createEffect((id: string) => notifications.hide(id));

    return { showFx, hideFx, updateFx, init, destroy };
};
