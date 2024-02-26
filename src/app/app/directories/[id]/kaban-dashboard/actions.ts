import { getAuthParams } from "@/app/Componnets/actions";
import { DirectoryActions } from "@/server/actions/DirectoryActions";

export const getDirectoryAndTasks = async (directoryId: string) => {
    const authParams = await getAuthParams();
    
    const result = await DirectoryActions.getDirectoryAndTasks(authParams, directoryId);

    return result;
};