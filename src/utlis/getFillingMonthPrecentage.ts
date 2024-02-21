import { MonthPercentage } from "@/server/actions/types";

export const getFillingMonthPrecentage = (days: number[]): MonthPercentage[] => {
    const percentage = [] as MonthPercentage[];

    if (!days.length) {
        return percentage;
    }
    const sortedDays = days.sort((a, b) => b - a);
    let startFrom: number;
    let continueDay: number;

    sortedDays.forEach((dayNumber, index, days) => {
        if (index === 0) {
            index === days.length - 1 && percentage.push(getPercentage(dayNumber, dayNumber));
            startFrom = dayNumber;
        } else if (index === days.length - 1) {
            percentage.push(getPercentage(startFrom, dayNumber));
        } else if (continueDay && dayNumber - continueDay >= 7) {
            percentage.push(getPercentage(startFrom, continueDay));

            startFrom = dayNumber;
            continueDay = dayNumber;
        } else {
            continueDay = dayNumber;
        }

    });

    return percentage

};

const getPercentage = (from: number, to: number): MonthPercentage => {
    return {
        from: from / 30 * 100 - 0.3,
        to: to / 30 * 100 + 0.3,
    };
};
