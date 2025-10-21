import type { ReactNode } from "react";

import { useUnit } from "effector-react";
import { tw } from "typewind";

import { useForm } from "@effector-reform/react";
import { IconLock, IconLogin2, IconUser } from "@tabler/icons-react";

import { HttpErrorStatus } from "@app/shared/api/http-client";
import { errorBaseSchema } from "@app/shared/api/http-client/schemas";
import { doesSatisfySchema } from "@app/shared/lib/does-satisfy-schema";
import { getFieldError } from "@app/shared/lib/form";
import { ValidationErrorEnum } from "@app/shared/types/validation";
import { Button, PasswordInput, TextInput } from "@app/shared/ui-kit/components";

import type { SignInModel } from "../../model/sign-in";
import { FieldNames } from "../../model/sign-in";

const errorMessages = {
    [FieldNames.login]: {
        [ValidationErrorEnum.Required]: () => "Введите имя пользователя",
    },
    [FieldNames.password]: {
        [ValidationErrorEnum.Required]: () => "Введите пароль",
    },
};

export const SignInForm = ({
    $$model,
    children,
}: {
    $$model: SignInModel;
    children: ReactNode;
}) => {
    const [errors, isFormSubmitting] = useUnit([$$model.$errors, $$model.$isLoading]);

    const { fields, onSubmit } = useForm($$model.$form);

    return (
        <div className={tw.flex.flex_col.gap_2}>
            <form onSubmit={onSubmit} noValidate={true} className={tw.flex.flex_col.gap_8}>
                <div className={tw.flex.flex_col.gap_4.items_stretch}>
                    <TextInput
                        value={fields[FieldNames.login].value}
                        onChange={fields[FieldNames.login].onChange}
                        placeholder="..."
                        label="Введите логин"
                        leftSection={<IconUser width={20} height={20} />}
                        required={true}
                        autoCapitalize="none"
                        error={getFieldError(
                            errors.form[FieldNames.login],
                            errorMessages[FieldNames.login],
                        )}
                    />

                    <PasswordInput
                        value={fields[FieldNames.password].value}
                        onChange={fields[FieldNames.password].onChange}
                        placeholder="..."
                        label="Введите пароль"
                        autoCapitalize="none"
                        leftSection={<IconLock width={20} height={20} />}
                        required={true}
                        error={getFieldError(
                            errors.form[FieldNames.password],
                            errorMessages[FieldNames.password],
                        )}
                    />

                    {children}
                </div>

                <Button
                    type="submit"
                    disabled={isFormSubmitting}
                    loading={isFormSubmitting}
                    leftSection={<IconLogin2 width={24} height={24} />}
                >
                    Войти
                </Button>
            </form>

            {errors.isNonFormError && errors.error && (
                <>
                    {doesSatisfySchema(errorBaseSchema)(errors.error) ? (
                        <div className={tw.text_body_14.text_red}>
                            {errors.error.status === HttpErrorStatus.UNAUTHORIZED &&
                                "Неверные данные для входа"}

                            {errors.error.status === HttpErrorStatus.TOO_MANY_REQUESTS &&
                                "Пользователь заблокирован. Свяжитесь с администратором для сброса пароля"}

                            {![
                                HttpErrorStatus.UNAUTHORIZED,
                                HttpErrorStatus.TOO_MANY_REQUESTS,
                            ].includes(errors.error.status) &&
                                "Не удалось войти в систему, обратитесь к администратору"}
                        </div>
                    ) : (
                        <div className={tw.text_body_14.text_red}>
                            Не удалось войти в систему, обратитесь к администратору
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
