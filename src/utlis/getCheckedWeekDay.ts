import { Dayjs } from "dayjs";

export const getCheckedWeekDay = (currentDay: Dayjs): Dayjs => {
    if (currentDay.isSame(currentDay.day(0), 'day')) {
        return currentDay.add(1, 'day');
    } else if (currentDay.isSame(currentDay.day(6), 'day')) {
        return currentDay.subtract(1, 'day');
    }
    return currentDay;
}