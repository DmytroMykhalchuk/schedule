import { getCookieProjectId } from "@/app/Componnets/actions";
import { DirectoryActions } from "@/server/actions/DirectoryActions";

export const getDirectoryAndTasks = async (directoryId: string, email: string) => {
    const projectId = getCookieProjectId();

    const result = await DirectoryActions.getDirectoryAndTasks({ projectId, email }, directoryId);

    return result;
};