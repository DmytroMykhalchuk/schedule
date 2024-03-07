import { CommentActions } from "@/server/actions/CommentActions";
import { getCookieProjectId } from "../actions";
import { DirectoryActions } from "@/server/actions/DirectoryActions";
import { TaskActions } from "@/server/actions/TaskActions";

export const getLastComments = async (email: string) => {
    const projectId = getCookieProjectId();

    const comments = await CommentActions.getLastComments({ projectId, email });

    return comments;
};

export const getDirectories = async (email: string) => {
    const projectId = getCookieProjectId();
    const directories = await DirectoryActions.getDirectories({ email, projectId })
    return directories;
};

export const getUrgantTasks = async (email: string) => {
    const projectId = getCookieProjectId();

    const tasks = await TaskActions.getUrgentTasks({ projectId, email })
    return tasks;
};
