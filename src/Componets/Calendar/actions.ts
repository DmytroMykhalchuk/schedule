import { CalendarActions } from "@/server/actions/CalendarActions";
import { cookies } from "next/headers";
import { getCookieProjectId } from "../actions";

export const getDaysWithCurrentMonth = async (date: string, email: string) => {
    const projectId = getCookieProjectId();

    const days = await CalendarActions.getMonthTaskDays({ projectId, email }, date);

    return days;

};

export const getWeekTasks = async (date: string, email: string) => {
    const projectId = getCookieProjectId();

    const tasks = CalendarActions.getWeekTasks({ projectId, email }, date);

    return tasks;
};