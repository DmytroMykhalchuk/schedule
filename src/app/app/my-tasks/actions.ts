import { getAuthParams } from "@/app/Componnets/actions";
import { TaskActions } from "@/server/actions/TaskActions";
import { cookies } from "next/headers";

export const getMyTasks = async () => {
    const { projectId, sessionId } =  await getAuthParams();

    const tasks = await TaskActions.getMyTasks(projectId, sessionId);

    return tasks;
};