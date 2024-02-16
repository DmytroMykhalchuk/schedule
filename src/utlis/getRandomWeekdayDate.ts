import { getRandomInt } from "@/server/utils/utils";

export const getRandomWeekdayDate = (maxDayCount = 30) => {
    const now = new Date();
    const daysToSkip = (now.getDay() + 6) % 7;
    const randomDate = new Date(now.getTime() + (1000 * 60 * 60 * 24 * (daysToSkip + getRandomInt(1, maxDayCount))));
    return randomDate;
};