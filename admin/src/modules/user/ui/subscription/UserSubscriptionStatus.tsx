import cx from "classnames";
import { isNil } from "ramda";
import { tw } from "typewind";

import type { UserDto } from "@app/shared/api/generated";
import { UserSubscriptionDtoStatus } from "@app/shared/api/generated";

const statusTextBySubscription = {
    [UserSubscriptionDtoStatus.active]: "Активная",
    [UserSubscriptionDtoStatus.expired]: "Истекла",
    [UserSubscriptionDtoStatus.cancelled]: "Отменена",
    [UserSubscriptionDtoStatus.payment_failed]: "Неуспешный платеж",
} as const satisfies Record<UserSubscriptionDtoStatus, string>;

const classNamesBySubscription = {
    [UserSubscriptionDtoStatus.active]: tw.text_green,
    [UserSubscriptionDtoStatus.expired]: tw.text_red,
    [UserSubscriptionDtoStatus.cancelled]: tw.text_red,
    [UserSubscriptionDtoStatus.payment_failed]: tw.text_dark_grey,
} as const satisfies Record<UserSubscriptionDtoStatus, string>;

export const UserSubscriptionStatus = ({ user }: { user: UserDto }) => {
    if (isNil(user.subscription?.status)) {
        return "—";
    }

    return (
        <span className={cx(classNamesBySubscription[user.subscription.status], tw.font_semibold)}>
            {statusTextBySubscription[user.subscription.status]}
        </span>
    );
};
