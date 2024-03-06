import { DirectoryActions } from '@/server/actions/DirectoryActions';
import { getCookieProjectId } from './../actions';
import { PriorityType, StatusType } from '@/server/actions/types';
import { ProjectActions } from '@/server/actions/ProjectActions';
import { redirect } from 'next/navigation';
import { TaskActions } from '@/server/actions/TaskActions';
import { TeamActions } from '@/server/actions/TeamActions';
import { CategoryActions } from '@/server/actions/CategoryActions';
import { defaultCategory, defaultDirectory } from '@/server/constants';

export const defaultFirstDirectory = 'choose_directory'
export const defaultFirstUserId = '0'

export const getProjectUsers = async (isRequiredRolelessUsers = false) => {
    const projectId = getCookieProjectId();

    if (!projectId) {
        return;
    }

    const users = await ProjectActions.getProjectUsers(projectId, isRequiredRolelessUsers);

    return users;
};

export const getProjectDirectories = async (email: string) => {
    const projectId = getCookieProjectId();

    const directories = await DirectoryActions.getDirectories({ projectId, email });
    return directories;
};

export const deleteTeamMember = async (formData: FormData) => {
    'use server'

    const projectId = getCookieProjectId()

    const userId = formData.get('user_id') as string;
    const email = formData.get('auth_email') as string;

    const result = await TeamActions.removeTeamMemeber({ projectId, email }, userId);
    if (result.success) {
        redirect('/app/add/team');
    }
};

export const getCategoriesList = async (email: string) => {
    const projectId = getCookieProjectId();

    const categories = await CategoryActions.getCategories({ projectId, email });

    return categories;
};

export const getTask = async (taskId: string, email: string) => {
    const projectId = getCookieProjectId()

    const response = await TaskActions.getTaskAndCommentsById({ projectId, email }, taskId);
    return response;
};

export const updateTask = async (formData: FormData) => {
    'use server';
    const projectId = getCookieProjectId()

    const taskId = formData.get('task_id') as string;
    const name = formData.get('task_name') as string;
    const assignee = formData.get('assignee') as string;
    const status = formData.get('status') as StatusType;
    const directory = formData.get('directory') as string || null;
    const categoryId = formData.get('category_id') as string || null;
    const dueDate = formData.get('due_date') as string;
    const priority = formData.get('priority') as PriorityType;
    const description = formData.get('description') as string;
    const fromHour = formData.get('from_hour') as string;
    const toHour = formData.get('to_hour') as string;
    const subtasks = formData.getAll('subtasks') as string[] | null;
    const email = formData.get('auth_email') as string;

    const result = await TaskActions.updateTask(
        { projectId, email },
        {
            name, taskId, assignee, status, dueDate, priority, description, subtasks,
            directory: directory === defaultDirectory.value ? null : directory || null,
            categoryId: categoryId === defaultCategory._id ? null : categoryId || null,
            toHour: +toHour,
            fromHour: +fromHour,
        }
    );

    if (result.success) {
        redirect('/app/add/tasks/' + taskId + '?is_updated=1');
    }
};

export const deleteTask = async (formData: FormData) => {
    'use server';
    const projectId = getCookieProjectId();

    const email = formData.get('auth_email') as string;
    const taskId = formData.get('task_id') as string;

    const result = await TaskActions.deleteTask({ email, projectId }, taskId);

    if (result.success) {
        redirect('/app/my-tasks');
    }
};