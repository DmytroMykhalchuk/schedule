import { CalendarActions } from "@/server/actions/CalendarActions";
import { cookies } from "next/headers";
import { getAuthParams } from "../actions";

export const getDaysWithCurrentMonth = async (date: string) => {
    const { projectId, sessionId } =  await getAuthParams();

    const days = await CalendarActions.getMonthTaskDays(projectId, sessionId, date);

    return days;

};

export const getWeekTasks = async (date: string) => {
    const { projectId, sessionId } =  await getAuthParams();

    const tasks = CalendarActions.getWeekTasks({ projectId, sessionId }, date);
    
    return tasks;
};