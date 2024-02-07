import { CalendarActions } from "@/server/actions/CalendarActions";
import { cookies } from "next/headers";

export const getDaysWithCurrentMonth = async (date: string) => {
    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const days = await CalendarActions.getMonthTaskDays(projectId, sessionId, date);

    return days;

};

export const getWeekTasks = async (date: string) => {
    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const tasks = CalendarActions.getWeekTasks({ projectId, sessionId }, date);
    
    return tasks;
};