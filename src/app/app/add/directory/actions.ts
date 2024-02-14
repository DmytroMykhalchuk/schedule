'use server';
import { getAuthParams } from "@/app/Componnets/actions";
import { DirectoryActions } from "@/server/actions/DirectoryActions";
import { ProjectActions } from "@/server/actions/ProjectActions";
import { projectIdCookieKey } from "@/server/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createDirectory = async (formData: FormData) => {
    'use server';

    const directoryName = formData.get('new_directory') as string;
    const targetProjectId = cookies().get(projectIdCookieKey)?.value;

    if (!directoryName || !targetProjectId) {
        throw new Error('Didnt provided directory name or target project id');
        return;
    }

    await DirectoryActions.storeDirectory(directoryName, targetProjectId);
    redirect('/app');
};

export const getDirectories = async () => {
    const authParams = await getAuthParams();
    const directories = await DirectoryActions.getDirectories(authParams);

    return directories;
};