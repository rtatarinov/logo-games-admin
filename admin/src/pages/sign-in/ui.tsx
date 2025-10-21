import { tw } from "typewind";

import { SignIn } from "@app/modules/session";

import type { SignInPageModel } from "./model";

export const SignInPage = ({ $$model }: { $$model: SignInPageModel }) => (
    <div className={tw.flex.flex_col.items_center.pt_20}>
        <SignIn $$model={$$model.$$signIn} />
    </div>
);
