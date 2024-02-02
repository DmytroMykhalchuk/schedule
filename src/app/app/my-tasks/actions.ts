import { TaskActions } from "@/server/actions/TaskActions";
import { cookies } from "next/headers";

export const getMyTasks = async () => {
    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const tasks = await TaskActions.getMyTasks(projectId, sessionId);

    return tasks;
};