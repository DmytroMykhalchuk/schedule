import dayjs from "dayjs"

type MaskType = 'DD.MM.YYYY';

export const translateDateToDayjs = (date: string, mask: MaskType = 'DD.MM.YYYY') => {
    if (mask === 'DD.MM.YYYY') {
        const splittedDay = date.split('.');
        if (splittedDay.length !== 3)
            return dayjs()

        return dayjs(`${splittedDay[2]}, ${splittedDay[1]}, ${splittedDay[0]},`);
    }
    return dayjs();
}