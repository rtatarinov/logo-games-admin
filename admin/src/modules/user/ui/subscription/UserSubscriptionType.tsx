import { isNil } from "ramda";

import { type UserDto, UserSubscriptionDtoType } from "@app/shared/api/generated";

export const textByType = {
    [UserSubscriptionDtoType.vk]: "ВКонтакте",
    [UserSubscriptionDtoType.recurring]: "Юкасса",
    [UserSubscriptionDtoType.one_time]: "Разовая оплата",
} as const satisfies Record<UserSubscriptionDtoType, string>;

export const UserSubscriptionType = ({ user }: { user: UserDto }) => {
    if (isNil(user.subscription?.type)) {
        return "—";
    }

    return textByType[user.subscription.type];
};
