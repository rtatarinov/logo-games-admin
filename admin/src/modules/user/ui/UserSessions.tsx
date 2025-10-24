import cx from "classnames";
import { useUnit } from "effector-react";
import { tw } from "typewind";

import { formatDate } from "@app/shared/lib/date-and-time";
import { Loader } from "@app/shared/ui-kit/components";

import type { UserSessionsModel } from "../model";

export const UserSessions = ({ $$model }: { $$model: UserSessionsModel }) => {
    const [isLoading, sessions] = useUnit([$$model.$isLoading, $$model.$sessions]);

    return (
        <div className={tw.flex.flex_col.gap_3.max_w_["480px"]}>
            <h3 className={tw.m_0}>Даты входа пользователя</h3>
            {isLoading && <Loader size={32} centered={true} />}

            {sessions.length > 0 && (
                <div className={tw.flex.flex_col.gap_1.border_light_grey_hover.border.border_solid}>
                    <div className={tw.grid.grid_cols_2.bg_light_grey.py_2.px_3}>
                        <div>Дата</div>
                        <div>Время</div>
                    </div>

                    {sessions.map((session, index) => (
                        <div
                            className={cx(
                                tw.grid.grid_cols_2,
                                tw.py_2.px_3.border_none,
                                index !== sessions.length - 1 &&
                                    tw.border_b.border_b_solid.border_b_light_grey_hover,
                            )}
                            key={session.id}
                        >
                            <div>{formatDate(session.createdAt, "DD.MM.YYYY")}</div>
                            <div>{formatDate(session.createdAt, "HH:mm")}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
