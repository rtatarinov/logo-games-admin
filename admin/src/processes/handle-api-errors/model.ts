import { createAction } from "effector-action";

import type { SessionModel } from "@app/modules/session";

import { handleApiError, HttpErrorStatus } from "@app/shared/api/http-client";
import { isContractDataError } from "@app/shared/api/http-client/farfetched";
import { errorBaseSchema } from "@app/shared/api/http-client/schemas";
import { log, maybeError, reasonText } from "@app/shared/lib/clilog";
import { doesSatisfySchema } from "@app/shared/lib/does-satisfy-schema";
import { signInRoute } from "@app/shared/routing";

import type { NotificationModel } from "@app/infrastructure-entities/notification-center";

export type HandleApiErrorModel = ReturnType<typeof createHandleApiErrorsModel>;

const getNotificationByStatus = (status: HttpErrorStatus) => {
    switch (status) {
        case HttpErrorStatus.TOO_MANY_REQUESTS:
            return {
                color: "red",
                message: "Свяжитесь с администратором для сброса пароля",
                title: "Пользователь заблокирован",
                autoClose: false,
            };

        case HttpErrorStatus.FORBIDDEN:
            return {
                color: "red",
                message:
                    "Свяжитесь с администратором, чтобы понять почему вам недоступен этот функционал",
                title: "Доступ запрещен",
                autoClose: false,
            };

        case HttpErrorStatus.UNAUTHORIZED:
        case HttpErrorStatus.BAD_REQUEST:
        case HttpErrorStatus.NOT_FOUND:
        case HttpErrorStatus.INTERNAL_SERVER_ERROR:
        default:
            return {
                color: "red",
                message:
                    "Произошла ошибка при выполнении запроса. Попробуйте еще раз. Если проблема сохраняется, свяжитесь с поддержкой.",
                title: "Ошибка обработки запроса",
                autoClose: false,
            };
    }
};

export const createHandleApiErrorsModel = ({
    $$notification,
    $$session,
}: {
    $$notification: NotificationModel;
    $$session: SessionModel;
}) => {
    createAction({
        clock: handleApiError,
        source: signInRoute.$isOpened,
        target: {
            showNotification: $$notification.showFx,
            destroySession: $$session.destroy,
        },
        fn: (target, isSignInRouteOpened, error) => {
            if (isContractDataError(error)) {
                // TODO: how to determine the failing contract
                log.error(`API error: invalid contract`);

                return target.showNotification({
                    color: "red",
                    message:
                        "Произошла ошибка при выполнении запроса. Попробуйте еще раз. Если проблема сохраняется, свяжитесь с поддержкой.",
                    title: "Ошибка обработки запроса",
                    autoClose: false,
                });
            }

            log.error(`API error${reasonText(error)}`, maybeError(error));

            if (!isSignInRouteOpened && doesSatisfySchema(errorBaseSchema)(error)) {
                if (error.status === HttpErrorStatus.UNAUTHORIZED) {
                    return target.destroySession();
                }

                return target.showNotification(getNotificationByStatus(error.status));
            }
        },
    });
};
