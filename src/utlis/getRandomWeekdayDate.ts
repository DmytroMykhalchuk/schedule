import { getRandomInt } from "@/server/utils/utils";
import dayjs from "dayjs";

export const getRandomWeekdayDate = (maxDayCount = 30, generateBefore?: boolean) => {
    const now = new Date();
    const daysToSkip = (now.getDay() + 6) % 7;
    const randomDate = new Date(now.getTime() + (1000 * 60 * 60 * 24 * (daysToSkip + getRandomInt(1, maxDayCount)) * (generateBefore ? -1 : 1)));
    const generatedDate = dayjs(randomDate);

    if (generatedDate.day(0).isSame(generatedDate, 'day')) {
        return generatedDate.add(1, 'day').toDate();
    }
    else if (generatedDate.day(6).isSame(generatedDate, 'day')) {
        return generatedDate.subtract(1, 'day').toDate();
    }

    return randomDate;
};