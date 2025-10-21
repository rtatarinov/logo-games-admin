import { useUnit } from "effector-react";
import { isNotEmpty, isNotNil } from "ramda";
import { tw } from "typewind";

import type { SessionModel } from "@app/modules/session";

import type { User } from "@app/shared/api/generated";
import { NavItem } from "@app/shared/ui-kit/components";

import { useNavigationConfig } from "./lib/useNavigationConfig";

export const NavigationContent = ({
    user,
    onCloseNavigation,
}: {
    user: User;
    onCloseNavigation: () => void;
}) => {
    const config = useNavigationConfig(user.role);

    return (
        <nav className={tw.flex.flex_col.gap_1.pb_8.px_4.pt_4}>
            {config.map((section) => (
                <ul
                    className={tw.flex.flex_col.gap_["0.5"].list_none.p_0.m_0.lg(tw.gap_1)}
                    key={section.id}
                >
                    {isNotEmpty(section.title) && (
                        <li className={tw.px_1.py_2.text_body_16.italic.text_dark_grey}>
                            {section.title}
                        </li>
                    )}

                    {section.children.map(({ icon: Icon, title, href }) => {
                        return (
                            <li key={title}>
                                <NavItem
                                    icon={<Icon width={24} height={24} />}
                                    to={href}
                                    data-active={useUnit(href.$isOpened)}
                                    onCloseNavigation={onCloseNavigation}
                                >
                                    {title}
                                </NavItem>
                            </li>
                        );
                    })}
                </ul>
            ))}
        </nav>
    );
};

export const Navigation = ({
    $$session,
    onCloseNavigation,
}: {
    $$session: SessionModel;
    onCloseNavigation: () => void;
}) => {
    const user = useUnit($$session.$me);

    return (
        <>
            {isNotNil(user) && (
                <NavigationContent user={user} onCloseNavigation={onCloseNavigation} />
            )}
        </>
    );
};
