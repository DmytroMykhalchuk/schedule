import { getCookieProjectId } from "@/Componets/actions";
import { TaskActions } from "@/server/actions/TaskActions";

export const getMyTasks = async (email: string) => {
    const projectId = getCookieProjectId();

    const tasks = await TaskActions.getMyTasks({ projectId, email });

    return tasks;
};