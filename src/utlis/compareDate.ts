import dayjs from "dayjs";

const compareDate = (date1: dayjs.ConfigType, date2: dayjs.ConfigType, type = 1 as 1 | -1): number => {
    const dayjsDate1 = dayjs(date1);
    const dayjsDate2 = dayjs(date2);

    const comparisonResult = dayjsDate1.diff(dayjsDate2);
    if (type = 1) {

        if (comparisonResult > 0) {
            return 1;
        } else if (comparisonResult < 0) {
            return -1;
        } else {
            return 0;
        }
    } else {
        if (comparisonResult < 0) {
            return 1;
        } else if (comparisonResult > 0) {
            return -1;
        } else {
            return 0;
        }
    }
}