import { CommentActions } from "@/server/actions/CommentActions";
import { getAuthParams } from "../actions";
import { DirectoryActions } from "@/server/actions/DirectoryActions";

export const getLastComments = async () => {
    const { projectId, sessionId } = await getAuthParams();

    const comments = await CommentActions.getLastComments({ projectId, sessionId });

    return comments;
};

export const getDirectories = async () => {
    const authParams = await getAuthParams();
    const directories = await DirectoryActions.getDirectories(authParams)
    return directories;
};