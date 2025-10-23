import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";
import { tw } from "typewind";

import type { UsersListModel } from "@app/modules/user";
import { useMediaQuery } from "@mantine/hooks";

import { userRoute } from "@app/shared/routing";
import { Avatar, Loader, Pagination } from "@app/shared/ui-kit/components";
import { useTheme } from "@app/shared/ui-kit/theme";

export const UsersList = ({ $$model }: { $$model: UsersListModel }) => {
    const [isLoading, users, params, totalUsers, totalPages, shownPagination, changePage] = useUnit(
        [
            $$model.$isLoading,
            $$model.$users,
            $$model.$params,
            $$model.$total,
            $$model.$totalPages,
            $$model.$shownPagination,
            $$model.$$pagination.changePage,
        ],
    );

    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

    if (isLoading) {
        return <Loader size={32} centered={true} />;
    }

    return (
        <div className={tw.flex.flex_col}>
            <div className={tw.mb_4.text_dark_grey.text_body_14}>
                Всего найдено пользователей: {totalUsers}
            </div>

            <div className={tw.flex.flex_col.gap_6.mb_12}>
                {users.map((user) => (
                    <div className={tw.flex.items_start.gap_2.lg(tw.gap_4)} key={user.id}>
                        <Avatar
                            src={user.avatarUrl}
                            name={`${user.firstName} ${user.lastName}`}
                            size={isMobile ? 48 : 64}
                        />

                        <div>
                            <Link
                                to={userRoute}
                                params={{ id: String(user.id) }}
                                className={tw.inline_flex.mb_1.font_semibold.text_body_16.text_blue.lg(
                                    tw.mb_3,
                                )}
                            >
                                {user.firstName} {user.lastName}
                            </Link>

                            <div className={tw.flex.gap_2}>
                                <div
                                    className={tw.flex.gap_1.text_dark_grey.text_body_14.md(
                                        tw.text_body_16,
                                    )}
                                >
                                    <span>ID:</span>

                                    <Link
                                        to={userRoute}
                                        params={{ id: String(user.id) }}
                                        className={tw.text_dark_grey.underline}
                                    >
                                        {user.id}
                                    </Link>
                                </div>

                                <div
                                    className={tw.flex.gap_1.text_dark_grey.text_body_14.md(
                                        tw.text_body_16,
                                    )}
                                >
                                    <span>VK:</span>

                                    <a
                                        href={`https://vk.com/id${user.vkId}`}
                                        className={tw.text_dark_grey.underline}
                                        target="_blank"
                                    >
                                        {`https://vk.com/id${user.vkId}`}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {shownPagination && (
                <Pagination value={params.page} total={totalPages} onChange={changePage} />
            )}
        </div>
    );
};
