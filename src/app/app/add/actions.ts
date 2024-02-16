'use server';

import { ProjectActions } from "@/server/actions/ProjectActions";
import { UserActions } from "@/server/actions/UserActions";
import { projectIdCookieKey } from "@/server/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const generateDB = async () => {
    'use server';

    const projectId = cookies().get(projectIdCookieKey)?.value;
    if (!projectId) {
        return;
    }

    console.log(1)
    return ;
    await UserActions.randomGenerate();

    await ProjectActions.genearateRandomTasks(projectId);

    redirect('/app');
}