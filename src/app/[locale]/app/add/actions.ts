'use server';

import { getCookieProjectId } from "@/Componets/actions";
import { ProjectActions } from "@/server/actions/ProjectActions";
import { redirect } from "next/navigation";

export const generateDB = async () => {
    'use server';

    const projectId = getCookieProjectId();

    if (!projectId) {
        return;
    }

    // await UserActions.randomGenerate();
    await ProjectActions.genearateRandomTasks(projectId);

    // redirect('/app');
};

export const removeGenerated = async () => {
    'use server';

    const projectId = getCookieProjectId();

    if (!projectId) {
        return;
    }

    const result = await ProjectActions.removeGenerated(projectId);
    result.success && redirect('/app');
};