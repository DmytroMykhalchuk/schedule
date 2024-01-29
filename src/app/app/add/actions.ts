'use server';

import { ProjectActions } from "@/server/actions/ProjectActions";
import { UserActions } from "@/server/actions/UserActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const generateDB = async () => {
    'use server';

    const projectId = cookies().get('target_project')?.value;
    if (!projectId) {
        return;
    }

    // await UserActions.randomGenerate();

    await ProjectActions.genearateRandomTasks(projectId);

    redirect('/app');
}