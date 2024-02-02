import dayjs from "dayjs";
import connectDB from "../connectDB";
import { ProjectActions } from "./ProjectActions";
import User from "../models/User";
import { UserActions } from "./UserActions";
import Project from "../models/Project";

export type StatusType = 'not_started' | 'in_progress' | 'done';
export type PriorityType = 'low_priority' | 'medium_priority' | 'critical_prority';
export type CommentType = {
    _id: string
    userId: string
    name: string
    picture: string
    text: string
};

export type TaskShortType = {
    taskId: string
    name: string,
    dueDate: string,
    status: StatusType,
    directory: string,
    priority: PriorityType,
};

type ViewTaskType = {
    _id: string,
    name: string,
    description: string,
    dueDate: string,
    status: StatusType,
    priority: PriorityType,
    assignee: string | null
    directory: string
    subtasks: string[] | null
    comments: CommentType[]
};

type TaskUpdateType = {
    taskId: string
    name: string,
    assignee: string | null,
    status: StatusType,
    directory: string | null,
    dueDate: string,
    priority: PriorityType,
    description: string,
    subtasks: string[] | null,
};

export const TaskActions = {
    async getMyTasks(projectId: string, sessionId: string): Promise<TaskShortType[]> {
        await connectDB();

        const requiredDates = [
            dayjs().day(1).format('YYYY.MM.DD'),
            dayjs().day(2).format('YYYY.MM.DD'),
            dayjs().day(3).format('YYYY.MM.DD'),
            dayjs().day(4).format('YYYY.MM.DD'),
            dayjs().day(5).format('YYYY.MM.DD'),
        ];

        const selector = {
            'tasks': 1
        };
        const filters = {
            projectId, sessionId
        }

        const user = await UserActions.getUserBySessionId(sessionId);
        const project = await ProjectActions.getProjectByFilters(filters, selector);

        const filteredTasks = project?.tasks.filter((task: { assignee: string, dueDate: string }) => {
            return task.assignee === user._id.toString() && requiredDates.includes(task.dueDate);
        });


        const preparedTasks: TaskShortType[] = filteredTasks.map((task: TaskShortType & { _id: string }) => ({
            taskId: task._id.toString(),
            name: task.name,
            status: task.status,
            dueDate: task.dueDate,
            directory: task.directory,
            priority: task.priority,
        }));

        return preparedTasks;
    },

    async getTaskById(auth: { projectId: string, sessionId: string }, taskId: string): Promise<ViewTaskType> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(auth, { tasks: 1 });


        const task = project?.tasks.find((task: { _id: string }) => task._id.toString() === taskId);

        return task;
    },

    async updateTask(auth: { projectId: string, sessionId: string }, updateTask: TaskUpdateType): Promise<{ success: boolean }> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(auth, { tasks: 1 });

        project.tasks = project?.tasks.map((task: ViewTaskType) => {
            if (task._id.toString() === updateTask.taskId) {
                task.name = updateTask.name;
                task.assignee = updateTask.assignee as string;
                task.status = updateTask.status;
                task.priority = updateTask.priority;
                task.dueDate = updateTask.dueDate;
                task.description = updateTask.description;
                task.subtasks = updateTask.subtasks;
            }
            return task;
        });

        project.save();

        return { success: true };
    },
};