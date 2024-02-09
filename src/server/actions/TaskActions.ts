import connectDB from '../connectDB';
import dayjs from 'dayjs';
import mongoose from 'mongoose';
import Project from '../models/Project';
import Task from '../models/Task';
import { AuthType, StoreCommentType, StoreTaskType, TaskDB, TaskShortType, TaskUpdateType, UrgentTask, ViewTaskType } from './types';
import { CommentActions, CommentType } from './CommentActions';
import { ObjectId } from 'mongodb';
import { ProjectActions } from './ProjectActions';
import { UserActions } from './UserActions';

export const TaskActions = {
    async storeTask(auth: AuthType, storeTask: StoreTaskType): Promise<{ projectId?: string }> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(auth.sessionId);

        const taskModel = new Task({
            name: storeTask.name,
            assignee: storeTask.assignee,
            status: storeTask.status,
            directory: storeTask.directory,
            dueDate: storeTask.dueDate,
            priority: storeTask.priority,
            description: storeTask.description,
            subtasks: storeTask.subtasks,
            projectId: auth.projectId,
        });

        const task = await taskModel.save();

        if (storeTask?.comment) {
            const storeComment: StoreCommentType = {
                _id: new ObjectId(),
                name: user.name,
                picture: user.picture,
                projectId: auth.projectId,
                replyId: '',
                taskId: task._id,
                text: storeTask.comment,
                userId: user._id,
            };

            const comment = await CommentActions.createCommentOfTask(storeComment);

            task.comments.push(comment);
            task.save();
        }

        return task;
    },

    async getMyTasks(projectId: string, sessionId: string): Promise<TaskShortType[]> {
        await connectDB();

        const requiredDates = [
            dayjs().day(1).format('DD.MM.YYYY'),
            dayjs().day(2).format('DD.MM.YYYY'),
            dayjs().day(3).format('DD.MM.YYYY'),
            dayjs().day(4).format('DD.MM.YYYY'),
            dayjs().day(5).format('DD.MM.YYYY'),
        ];

        const user = await UserActions.getUserBySessionId(sessionId);
        const project = await ProjectActions.getProjectByFilters({ projectId, sessionId }, { _id: 1 });

        if (!project) {
            return [];
        }

        const tasks = await Task.find({ projectId: project._id, assignee: user._id, dueDate: { $in: requiredDates } }).sort({ dueDate: 1 });

        const preparedTasks: TaskShortType[] = tasks.map((task: TaskDB) => ({
            _id: task._id.toString(),
            taskId: task._id.toString(),
            name: task.name,
            status: task.status,
            dueDate: task.dueDate,
            directory: task.directory,
            priority: task.priority,
        }));

        return preparedTasks;
    },

    async getTaskAndCommentsById(auth: AuthType, taskId: string): Promise<{ comments: CommentType[], task: ViewTaskType }> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(auth.sessionId);
        const project = await ProjectActions.getProjectByFilters(auth, { _id: 1 });

        if (!project) {
            return { comments: [], task: {} as ViewTaskType };
        }

        const task = await Task.findOne({ _id: taskId });
        const comments = await CommentActions.getCommentsByIds(task.comments);
        const preparedCommnets: CommentType[] = comments.map((item) => {
            return {
                name: item.name,
                picture: item.picture,
                replyId: item.replyId,
                text: item.text,
                userId: item.userId.toString(),
                _id: item._id.toString(),
                isOwner: item.userId.toString() === user._id.toString(),
            };
        });

        return { task, comments: preparedCommnets };
    },

    async updateTask(auth: AuthType, updateTask: TaskUpdateType): Promise<{ success: boolean }> {
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
                task.subtasks = updateTask.subtasks || [];
            }
            return task;
        });

        project.save();

        return { success: true };
    },

    async getUrgentTasks(projectId: string, sessionId: string): Promise<UrgentTask[]> {
        await connectDB();
        const user = await UserActions.getUserBySessionId(sessionId);
        const project = await Project.findOne({ _id: projectId, users: user._id }, { name: 1 });

        if (!project?._id) {
            return [];
        }

        const requiredDates = [
            dayjs().format('DD.MM.YYYY'),
            dayjs().add(1, 'day').format('DD.MM.YYYY'),
            dayjs().add(2, 'day').format('DD.MM.YYYY'),
        ];

        const tasks = await Task.find({ projectId, dueDate: { $in: requiredDates } }, { name: 1, dueDate: 1 });

        const urgentsTasks = tasks.sort((a: { dueDate: string }, b: { dueDate: string }) => a.dueDate.localeCompare(b.dueDate))
            || [];

        return urgentsTasks;
    },

    async addCommentId(taskId: string, commentId: mongoose.Types.ObjectId) {
        await connectDB();

        const result = Task.findByIdAndUpdate(taskId, { $push: { comments: commentId } });
        console.log({ result });

        return result;
    }
};