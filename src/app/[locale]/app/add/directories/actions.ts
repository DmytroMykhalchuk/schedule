
import { getCookieProjectId } from "@/Componets/actions";
import { DirectoryActions } from "@/server/actions/DirectoryActions";
import { projectIdCookieKey } from "@/server/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createDirectory = async (formData: FormData) => {
    'use server';

    const directoryName = formData.get('new_directory') as string;
    const targetProjectId = cookies().get(projectIdCookieKey)?.value;

    if (!directoryName || !targetProjectId) {
        return;
    }

    await DirectoryActions.storeDirectory(directoryName, targetProjectId);
    redirect('/app/add/directories');
};

export const getDirectories = async (email: string) => {
    const projectId = getCookieProjectId();
    const directories = await DirectoryActions.getDirectories({ projectId, email });

    return directories;
};