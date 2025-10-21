import { tw } from "typewind";

import { Logo } from "@app/shared/ui-kit/components";

import type { SignInModel } from "../../model/sign-in";
import { ForgotPassword } from "./ForgotPassword";
import { SignInForm } from "./SignInForm";

export const SignIn = ({ $$model }: { $$model: SignInModel }) => (
    <div
        className={
            tw.flex.flex_col.gap_8.border.border_solid.border_light_grey_hover.py_4.px_6.max_w_[
                "360px"
            ].w_full
        }
    >
        <Logo mode="full" width={263} height={61} className={tw.mx_auto} />

        <SignInForm $$model={$$model}>
            <ForgotPassword />
        </SignInForm>
    </div>
);
