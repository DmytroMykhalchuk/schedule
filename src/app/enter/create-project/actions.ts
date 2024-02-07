'use server';

import { ProjectActions } from "@/server/actions/ProjectActions";
import { authCookieKey, projectIdCookieKey } from "@/server/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createProject = async (formData: FormData) => {
    'use server';
    const projectName = formData.get('new_project_name') as string;
    const sessionId = cookies().get(authCookieKey)?.value;
    if (!sessionId) {
        throw new Error('User isnt logined');
    }

    const projectId = await ProjectActions.storeProject({
        name: projectName,
    }, sessionId);

    cookies().set(projectIdCookieKey, projectId);
    redirect('/app');
}