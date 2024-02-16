'use server';

import { defaultFirstDirectory, defaultFirstUserId } from "@/app/Componnets/Add/actions";
import { getAuthParams } from "@/app/Componnets/actions";
import { TaskActions } from "@/server/actions/TaskActions";
import { redirect } from "next/navigation";

export const createTask = async (formDate: FormData) => {
    'use server';
    const { projectId, sessionId } = await getAuthParams();

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
        fromHour: parseInt(formDate.get('from_hour') as string),
        toHour: parseInt(formDate.get('to_hour') as string),
        categoryId: formDate.get('categoryId') as string,
    };
    const result = await TaskActions.storeTask({ projectId, sessionId }, newTask);

    //todo message notify about success
    redirect('/app/add/task');
};