'use server';

import { defaultFirstDirectory, defaultFirstUserId } from "@/app/Componnets/Add/actions";
import { ProjectActions } from "@/server/actions/ProjectActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createTask = async (formDate: FormData) => {
    'use server';
    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const assignee = formDate.get('assignee') as string;
    const directory = formDate.get('directory') as string;

    const newTask = {
        name: formDate.get('task_name') as string,
        assignee: assignee === defaultFirstUserId ? null : assignee,
        status: formDate.get('status') as string,
        directory: directory === defaultFirstDirectory ? null : directory,
        dueDate: formDate.get('due_date') as string,
        priority: formDate.get('priority') as string,
        description: formDate.get('description') as string,
        subtasks: formDate.getAll('subtasks') as string[] | null,
        comment: formDate.get('comment') as string | null,
    };
    const result = await ProjectActions.storeTask({ projectId, sessionId }, newTask);

    //todo message notify about success
    redirect('/app/add/task');
};