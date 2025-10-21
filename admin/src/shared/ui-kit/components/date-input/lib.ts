import dayjs from "dayjs";

type DateFormatConfig = Readonly<{
    format: string;
    separator: string;
    separatorPositions: readonly number[];
    regexp: RegExp;
    placeholder: string;
}>;

const dateConfigByLocale = {
    ru: {
        format: "DD.MM.YYYY",
        separator: ".",
        separatorPositions: [2, 5],
        regexp: /(^\d{0,2}$)|(^\d{2}\.\d{0,2}$)|(^\d{2}\.\d{2}\.\d{0,4}$)/,
        placeholder: "дд.мм.гггг",
    },
} as const satisfies Record<string, DateFormatConfig>;

export const getDateConfig = (): DateFormatConfig => dateConfigByLocale.ru;

export const getFormattedDate = (date: string) => {
    const { format } = getDateConfig();

    const possibleDate = dayjs(date, "YYYY-MM-DD", true);

    return possibleDate.isValid() ? dayjs(date).format(format) : date;
};

export const parseDateFromFormat = (dateString: string) => {
    const { format } = getDateConfig();

    const parsedDate = dayjs(dateString, format, true);

    return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : null;
};
