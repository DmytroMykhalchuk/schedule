'use server';

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

    await ProjectActions.storeDirectory(directoryName, targetProjectId);
    redirect('/app');
}