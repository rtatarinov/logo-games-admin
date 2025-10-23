import type { FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";

import { useUnit } from "effector-react";
import { isEmpty, isNotNil } from "ramda";
import { tw } from "typewind";

import type { UsersListModel } from "@app/modules/user";
import { usePrevious } from "@mantine/hooks";

import { Button, TextInput } from "@app/shared/ui-kit/components";

export const UsersSearch = ({ $$model }: { $$model: UsersListModel }) => {
    const [changeParams, isLoading] = useUnit([$$model.changeParams, $$model.$isLoading]);

    const [value, setValue] = useState("");
    const previous = usePrevious(value);

    const submit = useCallback(() => {
        changeParams({ search: value });
    }, [changeParams, value]);

    const handleSearch = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            submit();
        },
        [submit],
    );

    useEffect(() => {
        if (isEmpty(value) && isNotNil(previous) && previous !== value) {
            submit();
        }
    }, [value, submit, previous]);

    return (
        <form className={tw.flex.gap_2} onSubmit={handleSearch}>
            <TextInput
                value={value}
                onChange={setValue}
                className={tw.w_full.max_w_["320px"]}
                placeholder="Поиск по id, vk и ФИО"
                withClearButton={true}
            />

            <Button type="submit" disabled={isLoading || isEmpty(value.trim())}>
                Найти
            </Button>
        </form>
    );
};
