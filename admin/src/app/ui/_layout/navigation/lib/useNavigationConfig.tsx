import { useMemo } from "react";

import { IconBook2, IconHome } from "@tabler/icons-react";

import { homeRoute, usersRoute } from "@app/shared/routing";

export const useNavigationConfig = () =>
    useMemo(
        () =>
            [
                {
                    id: "dictionaries",
                    title: "",
                    children: [
                        {
                            title: "Главная",
                            icon: IconHome,
                            href: homeRoute,
                            hidden: false,
                        },
                        {
                            title: "Список пользователей",
                            icon: IconBook2,
                            href: usersRoute,
                            hidden: false,
                        },
                    ],
                },
            ]
                .map((section) => ({
                    ...section,
                    children: section.children.filter((child) => !child.hidden),
                }))
                .filter((section) => section.children.length > 0),
        [],
    );
