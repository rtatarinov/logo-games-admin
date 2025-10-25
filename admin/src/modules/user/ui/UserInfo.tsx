import { isNotNil } from "ramda";
import { tw } from "typewind";

import { useMediaQuery } from "@mantine/hooks";

import { type UserDto, UserSubscriptionDtoStatus } from "@app/shared/api/generated";
import { formatDate } from "@app/shared/lib/date-and-time";
import { Avatar } from "@app/shared/ui-kit/components";
import { useTheme } from "@app/shared/ui-kit/theme";

export const UserInfo = ({ user }: { user: UserDto }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.lg})`);

    return (
        <div className={tw.flex.flex_col.gap_4.lg(tw.flex_row.gap_8.items_center)}>
            <Avatar
                src={user.avatarUrl}
                name={`${user.firstName} ${user.lastName}`}
                size={isMobile ? 96 : 128}
                isSilver={Boolean(user.trial?.isActive)}
                isPremium={
                    isNotNil(user.subscription) &&
                    user.subscription.status === UserSubscriptionDtoStatus.active
                }
            />

            <div className={tw.flex.flex_col.gap_1.lg(tw.gap_2)}>
                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>ID пользователя:</span>
                    <span>{user.id}</span>
                </div>

                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>ВКонтакте:</span>

                    <a
                        href={`https://vk.com/id${user.vkId}`}
                        target="_blank"
                        className={tw.text_blue.underline.font_semibold}
                    >{`https://vk.com/id${user.vkId}`}</a>
                </div>

                <div className={tw.flex.items_center.gap_2}>
                    <span className={tw.font_semibold.pr_1.text_black}>Дата регистрации:</span>
                    <span>{formatDate(user.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};
