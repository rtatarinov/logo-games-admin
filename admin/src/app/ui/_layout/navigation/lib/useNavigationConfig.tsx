import {useMemo} from "react";

import {IconBook2,} from "@tabler/icons-react";

import type {UserRole} from "@app/shared/api/generated";
import {usersRoute,} from "@app/shared/routing";

export const useNavigationConfig = (role: UserRole) =>
    useMemo(
        () =>
            [
                {
                    id: "common",
                    title: "Пользователи",
                    children: [
                        {
                            title: "Список пользователей",
                            icon: IconBook2,
                            href: usersRoute,
                            hidden: false,
                        },
                    ],
                },
                {
                    id: "dictionaries",
                    title: "Справочники",
                    children: [
                    ],
                },
            ]
                .map((section) => ({
                    ...section,
                    children: section.children.filter((child) => !child.hidden),
                }))
                .filter((section) => section.children.length > 0),
        [role],
    );
