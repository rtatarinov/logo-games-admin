import { tw } from "typewind";

import { UsersList, UsersSearch } from "@app/modules/user";

import { PageTitle } from "@app/shared/ui-kit/components";

import type { UsersModel } from "./model";

export const Users = ({ $$model }: { $$model: UsersModel }) => (
    <>
        <PageTitle>Пользователи</PageTitle>

        <div className={tw.flex.flex_col.gap_4}>
            <UsersSearch $$model={$$model.$$users} />
            <UsersList $$model={$$model.$$users} />
        </div>
    </>
);
