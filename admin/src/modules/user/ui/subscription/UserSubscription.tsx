import type { ReactNode } from "react";

import { isNil, isNotNil } from "ramda";
import { tw } from "typewind";

import type { UserDto } from "@app/shared/api/generated";
import { formatDate } from "@app/shared/lib/date-and-time";

import { UserSubscriptionStatus } from "./UserSubscriptionStatus";
import { UserSubscriptionType } from "./UserSubscriptionType";

export const UserSubscription = ({ user }: { user: UserDto }) => {
    if (isNil(user.subscription)) {
        return (
            <Content>
                <div className={tw.text_dark_grey}>Пользователь не оформлял подписку</div>
            </Content>
        );
    }

    return (
        <Content>
            <div className={tw.flex.flex_col.gap_1.lg(tw.gap_2)}>
                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>Тип подписки:</span>

                    <span>
                        <UserSubscriptionType user={user} />
                    </span>
                </div>

                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>Статус подписки:</span>
                    <UserSubscriptionStatus user={user} />
                </div>

                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>
                        Дата следующего платежа:
                    </span>

                    <span>
                        {isNotNil(user.subscription?.nextPaymentAt)
                            ? formatDate(user.subscription.nextPaymentAt)
                            : "—"}
                    </span>
                </div>

                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>
                        Дата окончания подписки:
                    </span>

                    <span>
                        {isNotNil(user.subscription?.expiredAt)
                            ? formatDate(user.subscription.expiredAt)
                            : "—"}
                    </span>
                </div>
            </div>
        </Content>
    );
};

const Content = ({ children }: { children: ReactNode }) => (
    <div className={tw.flex.flex_col.gap_3}>
        <h3 className={tw.m_0}>Подписка</h3>
        {children}
    </div>
);
