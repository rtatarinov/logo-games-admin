import type { ReactNode } from "react";

import { isNil } from "ramda";
import { tw } from "typewind";

import type { UserDto } from "@app/shared/api/generated";
import { formatDate } from "@app/shared/lib/date-and-time";

export const UserTrialInfo = ({ user }: { user: UserDto }) => {
    const { trial } = user;

    if (isNil(trial)) {
        return (
            <Content>
                <div className={tw.text_dark_grey}>Пользователь не запрашивал пробный доступ</div>
            </Content>
        );
    }

    return (
        <div className={tw.flex.flex_col.gap_3}>
            <h3 className={tw.m_0}>Пробный период</h3>

            <div className={tw.flex.flex_col.gap_1.lg(tw.gap_2)}>
                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>Статус:</span>
                    <span>{trial.isActive ? "Активный" : "Неактивный"}</span>
                </div>

                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>Дата начала:</span>
                    <span>{formatDate(trial.startAt)}</span>
                </div>

                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>Дата окончания:</span>
                    <span>{formatDate(trial.endAt)}</span>
                </div>
            </div>
        </div>
    );
};

const Content = ({ children }: { children: ReactNode }) => (
    <div className={tw.flex.flex_col.gap_3}>
        <h3 className={tw.m_0}>Пробный период</h3>
        {children}
    </div>
);
