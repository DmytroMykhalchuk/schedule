import { TaskActions } from "@/server/actions/TaskActions";
import { getCookieProjectId } from "../actions";

export const getTaskByUser = async (email: string) => {
    const projectId = getCookieProjectId();

    const taskByUser = await TaskActions.getTaskByUser({ projectId, email });

    return taskByUser;
};