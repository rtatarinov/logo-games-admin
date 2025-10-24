import { useUnit } from "effector-react";
import { isNil } from "ramda";
import { tw } from "typewind";

import { UserCard, UserSessions } from "@app/modules/user";

import { APP_DOMAIN } from "@app/shared/constants";
import { CopyIcon, Loader, PageTitle } from "@app/shared/ui-kit/components";

import type { UserCardModel } from "./model";

export const UserCardPage = ({ $$model }: { $$model: UserCardModel }) => {
    const [isLoading, user] = useUnit([$$model.$$userCard.$isLoading, $$model.$$userCard.$user]);

    if (isLoading || isNil(user)) {
        return <Loader size={32} centered={true} />;
    }

    return (
        <>
            <div className={tw.flex.items_center.mb_8}>
                <PageTitle className={tw.important(tw.pb_0)}>
                    {user.firstName} {user.lastName}
                </PageTitle>

                <span>
                    <CopyIcon value={`${APP_DOMAIN}/users/${user.id}`} />
                </span>
            </div>

            <UserCard $$model={$$model.$$userCard} />
            <UserSessions $$model={$$model.$$userSessions} />
        </>
    );
};
