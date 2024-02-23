import { TaskActions } from "@/server/actions/TaskActions";
import { getAuthParams } from "../actions";

export const getTaskByUser = async () => {
    const authParams = await getAuthParams();

    const taskByUser = await TaskActions.getTaskByUser(authParams);

    return taskByUser;
};