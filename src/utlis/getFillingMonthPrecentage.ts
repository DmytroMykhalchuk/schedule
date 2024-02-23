import { MonthPercentage } from "@/server/actions/types";
import { Dayjs } from "dayjs";

const dayDiff = 1000 * 60 * 60 * 24;

export const getFillingMonthPrecentage = (days: Dayjs[], firstMonth: Dayjs, thirdMonth: Dayjs): MonthPercentage[] => {
    const percentage = [] as MonthPercentage[];

    if (!days.length) {
        return percentage;
    }
    const firstDayOfMonth = firstMonth.startOf('month');
    const totalDays = getDaysInMonths(firstMonth, thirdMonth);

    const sortedDays = days.sort((a, b) => a.diff(b))

    let startFrom: Dayjs;
    let continueDay: Dayjs;

    sortedDays.forEach((dayNumber, index, days) => {
        if (index === 0) {
            if (index === days.length - 1) {
                const passDaysFrom = getDiffInDays(firstDayOfMonth, dayNumber);
                percentage.push(getPercentage(passDaysFrom, passDaysFrom, totalDays));
            }
            startFrom = dayNumber;
        } else if (index === days.length - 1) {
            const passDaysFrom = getDiffInDays(firstDayOfMonth, startFrom);
            const passDaysTo = getDiffInDays(firstDayOfMonth, dayNumber);
            percentage.push(getPercentage(passDaysFrom, passDaysTo, totalDays));
        } else if (continueDay && dayNumber.diff(continueDay) >= dayDiff) {
            const passDaysFrom = getDiffInDays(firstDayOfMonth, startFrom);
            const passDaysTo = getDiffInDays(firstDayOfMonth, dayNumber);

            percentage.push(getPercentage(passDaysFrom, passDaysTo, totalDays));

            startFrom = dayNumber;
            continueDay = dayNumber;
        } else {
            continueDay = dayNumber;
        }

    });

    return percentage

};

const getPercentage = (fromDay: number, toDay: number, totalDays: number): MonthPercentage => {
    return {
        from: fromDay / totalDays * 100 - totalDays / 100,
        to: toDay / totalDays * 100 + totalDays / 100,
    };
};

const getDaysInMonths = (dateFrom: Dayjs, dateTo: Dayjs) => {
    const firstDayOfMonth = dateFrom.startOf('month');

    const lastDayOfMonth = dateTo.endOf('month');

    const daysInMonth = lastDayOfMonth.diff(firstDayOfMonth, 'days') + 1;

    return daysInMonth;
};

const getDiffInDays = (dateFrom: Dayjs, dateTo: Dayjs) => {
    return dateTo.diff(dateFrom, 'days') + 1;
};