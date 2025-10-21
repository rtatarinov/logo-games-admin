import "dayjs/locale/ru";

import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { getPlural } from "@app/shared/lib/plural";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ru");
dayjs.extend(duration);
dayjs.extend(customParseFormat);

export const DEFAULT_VIEW_DATE_FORMAT = "DD.MM.YYYY";
export const DEFAULT_DATE_STRING_FORMAT = "YYYY-MM-DD";

export const setTimezone = (timezone: string) => dayjs.tz.setDefault(timezone);

export const hasTime = (date: string) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(date);

export const getCurrentDate = () => dayjs.tz();

export const toDayJs = (date: string): Dayjs => dayjs(date);

export const formatDateLocal = (date: Dayjs, format?: string) =>
    dayjs(date).format(format ?? DEFAULT_VIEW_DATE_FORMAT);

export const formatDateTz = (date: Dayjs, format?: string) =>
    dayjs.tz(date).format(format ?? DEFAULT_VIEW_DATE_FORMAT);

export const formatDate = (date: string, format?: string) => {
    const withTime = hasTime(date);

    return withTime ? formatDateTz(toDayJs(date), format) : formatDateLocal(toDayJs(date), format);
};

export const formatToTzDateString = (date: Dayjs) => formatDateTz(date, DEFAULT_DATE_STRING_FORMAT);

export const formatToDateString = (date: Dayjs) =>
    formatDateLocal(date, DEFAULT_DATE_STRING_FORMAT);

export const isValidDate = (value: string | number | Date | Dayjs, format?: string) => {
    if (dayjs.isDayjs(value)) {
        return value.isValid();
    }

    if (format) {
        return dayjs(value, format, true).isValid();
    }

    return dayjs(value).isValid();
};

export const getHumanReadableAge = (birthDate: string | number | Date | Dayjs) => {
    const diff = dayjs.duration(dayjs().diff(dayjs(birthDate)));
    const years = diff.years();
    const months = diff.months();
    const days = diff.days();

    const displayedYears =
        years === 0 ? "" : `${years} ${getPlural(years, ["год", "года", "лет"])} `;
    const displayedMonths =
        months === 0 ? "" : `${months} ${getPlural(months, ["месяц", "месяца", "месяцев"])} `;

    return `${displayedYears}${displayedMonths}${days} ${getPlural(days, ["день", "дня", "дней"])}`;
};

export const formatTime = (time: string) => time.slice(0, -3);

export enum CALENDAR_PRESET_IDS {
    today = "today",
    yesterday = "yesterday",
    last7Days = "last7Days",
    thisWeek = "thisWeek",
    thisMonth = "thisMonth",
    lastMonth = "lastMonth",
    previousMonth = "previousMonth",
    previousYear = "previousYear",
    thisYear = "thisYear",
    lastYear = "lastYear",
}

export const getBaseCalendarPresets = (): {
    value: [string, string];
    label: string;
    id: CALENDAR_PRESET_IDS;
}[] => {
    const today = getCurrentDate();

    return [
        {
            value: [formatToDateString(today), formatToDateString(today)],
            label: "Сегодня",
            id: CALENDAR_PRESET_IDS.today,
        },
        {
            value: [
                formatToDateString(today.subtract(1, "day")),
                formatToDateString(today.subtract(1, "day")),
            ],
            label: "Вчера",
            id: CALENDAR_PRESET_IDS.yesterday,
        },
        {
            value: [formatToDateString(today.subtract(7, "day")), formatToDateString(today)],
            label: "Последние 7 дней",
            id: CALENDAR_PRESET_IDS.last7Days,
        },
        {
            value: [formatToDateString(today.startOf("week")), formatToDateString(today)],
            label: "Эта неделя",
            id: CALENDAR_PRESET_IDS.thisWeek,
        },
        {
            value: [formatToDateString(today.startOf("month")), formatToDateString(today)],
            label: "Этот месяц",
            id: CALENDAR_PRESET_IDS.thisMonth,
        },
        {
            value: [formatToDateString(today.subtract(1, "month")), formatToDateString(today)],
            label: "Последний месяц",
            id: CALENDAR_PRESET_IDS.lastMonth,
        },
        {
            value: [
                formatToDateString(today.subtract(1, "month").startOf("month")),
                formatToDateString(today.subtract(1, "month").endOf("month")),
            ],
            label: "Предыдущий месяц",
            id: CALENDAR_PRESET_IDS.previousMonth,
        },
        {
            value: [formatToDateString(today.startOf("year")), formatToDateString(today)],
            label: "Этот год",
            id: CALENDAR_PRESET_IDS.thisYear,
        },
        {
            value: [formatToDateString(today.subtract(1, "year")), formatToDateString(today)],
            label: "Последний год",
            id: CALENDAR_PRESET_IDS.lastYear,
        },
        {
            value: [
                formatToDateString(today.subtract(1, "year").startOf("year")),
                formatToDateString(today.subtract(1, "year").endOf("year")),
            ],
            label: "Предыдущий год",
            id: CALENDAR_PRESET_IDS.previousYear,
        },
    ];
};
