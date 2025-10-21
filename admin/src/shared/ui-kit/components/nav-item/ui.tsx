import type { ReactNode } from "react";
import { memo } from "react";

import type { RouteParams } from "atomic-router";
import type { LinkProps } from "atomic-router-react";
import { Link } from "atomic-router-react";
import cx from "classnames";
import { tw } from "typewind";

export interface NavItemProps extends LinkProps<RouteParams> {
    children: ReactNode;
    icon: ReactNode;
    className?: string;
    onCloseNavigation: () => void;
}

const _NavItem = ({ children, className, icon, onCloseNavigation, ...rest }: NavItemProps) => (
    <Link
        className={cx(
            tw.inline_flex.items_center.gap_2.px_3.py_2.text_black.transition_colors.hover_or_active(
                tw.text_green,
            ),
            className,
        )}
        onClick={onCloseNavigation}
        {...rest}
    >
        {icon}
        <span className={tw.text_h4.font_semibold.lg(tw.text_h3)}>{children}</span>
    </Link>
);

export const NavItem = memo(_NavItem);
