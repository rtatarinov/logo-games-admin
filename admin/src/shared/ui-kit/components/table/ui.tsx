import type { ReactNode } from "react";
import { forwardRef } from "react";

import { tw } from "typewind";

import type { TableData, TableProps as MantineTableProps } from "@mantine/core";
import { Table as MantineTable } from "@mantine/core";

type CommonTableProps = Pick<
    MantineTableProps,
    "highlightOnHover" | "stickyHeader" | "stickyHeaderOffset" | "classNames"
>;

export type SimpleTableProps = CommonTableProps & { data: TableData };
export type ComplexTableProps = CommonTableProps & { children: ReactNode };

export type TableProps = SimpleTableProps | ComplexTableProps;

const componentClassNames = {
    table: tw.border_light_grey_hover.min_w_["480px"],
    thead: tw.bg_light_grey,
    th: tw.text_body_16.font_bold.py_2.px_3,
    td: tw.text_body_16.border_light_grey_hover.py_2.px_3,
};

const TableWrapper = ({ children }: { children: ReactNode }) => (
    <div className={tw.max_w_full.overflow_x_auto}>{children}</div>
);

const _Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
    if ("data" in props) {
        const { data, classNames = {}, ...rest } = props;

        return (
            <TableWrapper>
                <MantineTable
                    data={data}
                    withTableBorder={true}
                    ref={ref}
                    classNames={{ ...componentClassNames, ...classNames }}
                    {...rest}
                />
            </TableWrapper>
        );
    }

    const { classNames = {}, ...rest } = props;

    return (
        <TableWrapper>
            <MantineTable
                ref={ref}
                withTableBorder={true}
                classNames={{ ...componentClassNames, ...classNames }}
                {...rest}
            />
        </TableWrapper>
    );
});

_Table.displayName = "Table";

export const Table = Object.assign(_Table, {
    Thead: MantineTable.Thead,
    Th: MantineTable.Th,
    Tbody: MantineTable.Tbody,
    Tr: MantineTable.Tr,
    Td: MantineTable.Td,
});
