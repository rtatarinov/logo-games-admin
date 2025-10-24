import { useUnit } from "effector-react";
import { isNil } from "ramda";
import { tw } from "typewind";

import type { UserCardModel } from "@app/modules/user";

import { UserSubscription } from "./subscription/UserSubscription";
import { UserInfo } from "./UserInfo";
import { UserTrialInfo } from "./UserTrialInfo";

export const UserCard = ({ $$model }: { $$model: UserCardModel }) => {
    const [user] = useUnit([$$model.$user]);

    if (isNil(user)) {
        return null;
    }

    return (
        <div className={tw.flex.flex_col.gap_8.mb_12}>
            <UserInfo user={user} />

            <div className={tw.flex.flex_col.gap_8.max_w_["720px"].lg(tw.flex_row.justify_between)}>
                <UserSubscription user={user} />
                <UserTrialInfo user={user} />
            </div>
        </div>
    );
};
