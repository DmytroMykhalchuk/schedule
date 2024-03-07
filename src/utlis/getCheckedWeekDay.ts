import { Dayjs } from "dayjs";

export const getCheckedWeekDay = (currentDay: Dayjs): Dayjs => {
    if (currentDay.isSame(currentDay.day(0), 'day')) {
        return currentDay.add(1, 'day');
    } else if (currentDay.isSame(currentDay.day(6), 'day')) {
        return currentDay.subtract(1, 'day');
    }
    // console.log(currentDay.isSame(currentDay.day(5), 'day')
    // ,currentDay.day(5).format('DD.MM.YYYY'),
    // currentDay.format('DD.MM.YYYY')
    // )
    return currentDay;
}