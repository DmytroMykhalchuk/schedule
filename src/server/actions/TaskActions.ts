import connectDB from '../connectDB';
import dayjs from 'dayjs';
import mongoose from 'mongoose';
import Project from '../models/Project';
import Task from '../models/Task';
import { AuthType, CommentType, StoreCommentType, StoreTaskType, TaskDB, TaskShortType, TaskUpdateType, UrgentTask, ViewTaskType, ProccessStatusType, PriorityType, StatusType } from './types';
import { CommentActions } from './CommentActions';
import { ObjectId } from 'mongodb';
import { ProjectActions } from './ProjectActions';
import { UserActions } from './UserActions';
import { priorities, statuses, workHours } from '../constants';
import { CategoryActions } from './CategoryActions';
import User from '../models/User';
import { getRandomBoolean, getRandomInt, getRandomString } from '../utils/utils';
import { getRandomWeekdayDate } from '@/utlis/getRandomWeekdayDate';

export const TaskActions = {
    async storeTask(auth: AuthType, storeTask: StoreTaskType): Promise<{ projectId?: string }> {
        await connectDB();
        //todo validation for hours
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
            fromHour: storeTask.fromHour,
            toHour: storeTask.toHour,
            categoryId: storeTask.categoryId,
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
            fromHour: task.fromHour,
            toHour: task.toHour,
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
                ...item.toObject(),
                _id: item._id.toString(),
                userId: item.userId.toString(),
                isOwner: item.userId.toString() === user._id.toString(),
            };
        });

        const handledTask: ViewTaskType = {
            ...task.toObject(),
            assignee: task.assignee.toString(),
            _id: task._id.toString(),
            categoryId: task?.categoryId?.toString() || ''
        };

        return { task: handledTask, comments: preparedCommnets };
    },

    async updateTask(auth: AuthType, updateTask: TaskUpdateType): Promise<{ success: boolean }> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(auth, { _id: 1 });

        if (!project) {
            return { success: false };
        }

        const task = await Task.findOneAndUpdate({ _id: updateTask.taskId }, {
            name: updateTask.name,
            assignee: updateTask.assignee,
            status: updateTask.status,
            priority: updateTask.priority,
            dueDate: updateTask.dueDate,
            description: updateTask.description,
            fromHour: updateTask.fromHour,
            toHour: updateTask.toHour,
            subtasks: updateTask.subtasks || [],
            categoryId: updateTask.categoryId,
        });

        return { success: Boolean(task) };
    },

    async getUrgentTasks(authParams: AuthType): Promise<UrgentTask[]> {
        await connectDB();
        const user = await UserActions.getUserBySessionId(authParams.sessionId);
        const project = await ProjectActions.getProjectByFilters(authParams, { _id: true });


        if (!project?._id || !user?._id) {
            return [];
        }

        const requiredDates = [
            dayjs().format('DD.MM.YYYY'),
            dayjs().add(1, 'day').format('DD.MM.YYYY'),
            dayjs().add(2, 'day').format('DD.MM.YYYY'),
        ];

        const tasks = await Task.find({ projectId: authParams.projectId, dueDate: { $in: requiredDates }, assignee: user._id }, { name: 1, dueDate: 1 });

        const urgentsTasks = tasks.sort((a: { dueDate: string }, b: { dueDate: string }) => a.dueDate.localeCompare(b.dueDate))
            || [];

        return urgentsTasks;
    },

    async addCommentId(taskId: string, commentId: mongoose.Types.ObjectId) {
        await connectDB();

        const result = Task.findByIdAndUpdate(taskId, { $push: { comments: commentId } });

        return result;
    },

    async getAllowedHours(auth: AuthType, date: string, userId: string | null, taskId?: string): Promise<number[]> {
        await connectDB();
        const allowedHours = workHours;

        if (!userId) {
            return allowedHours;
        }

        const user = await UserActions.getUserBySessionId(userId)
        const project = await ProjectActions.getProjectById(auth.projectId, {}, user._id);

        if (!project) {
            return [];
        };

        const tasks = await Task.find({ projectId: project._id, assignee: user._id, dueDate: date }, { fromHour: 1, toHour: 1, dueDate: 1 });

        tasks.forEach((task: { _id: mongoose.Types.ObjectId, fromHour: number, toHour: number }, index) => {
            if (task._id.toString() === taskId) return;

            const start = allowedHours.indexOf(task.fromHour) + +(task.fromHour !== workHours[0]);
            const deleteCount = allowedHours.indexOf(task.toHour) - allowedHours.indexOf(task.fromHour) - +(task.fromHour !== workHours[0] && task.toHour !== workHours[workHours.length - 1]);
            allowedHours.splice(start, deleteCount)
        });

        return allowedHours;
    },

    async deleteTask(authParams: AuthType, taskId: string): Promise<ProccessStatusType> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams, { _id: 1 });

        if (!project) {
            return { success: false };
        }

        const task = await Task.findOneAndDelete({ _id: taskId, projectId: project._id });

        return { success: Boolean(task) };
    },

    async generateTasks(projectId: string, count = 350) {
        await connectDB();
        const project = await ProjectActions.getProjectById(projectId);

        const categoryIds = await CategoryActions.generateCategories(projectId);
        const directories = project.directories as string[];

        const users = await User.find();
        const shuffledUsers = users.sort(() => 0.5 - Math.random());
        let targetUsers = [...shuffledUsers.slice(0, 5), project.admin_id];

        const taskIds = [] as mongoose.Types.ObjectId[];
        const userIds = targetUsers.map(item => item._id);

        const dateMarkHours = {} as any;

        for (let index = 0; index < count; index++) {
            const randomDate = getRandomWeekdayDate();
            const randomUserId = targetUsers[Math.floor(Math.random() * targetUsers.length)]._id;

            const fromHour = getRandomInt(workHours[0], workHours[workHours.length - 2]);
            const toHour = getRandomInt(fromHour + 1, workHours[workHours.length - 1]);
            const dueDate = `${randomDate.getDate().toString().toString().padStart(2, '0')}.${(randomDate.getMonth() + 1).toString().padStart(2, '0')}.${randomDate.getFullYear()}`;

            if (fromHour === toHour) {
                continue;
            } else {
                if (dateMarkHours.hasOwnProperty(dueDate)) {
                    const hours = dateMarkHours[dueDate] as number[];
                    let isForbidden = false;
                    for (let index = fromHour; index < toHour; index++) {
                        if (hours.includes(index)) {
                            isForbidden = true;
                            break;
                        }
                    }
                    if (isForbidden) {
                        continue;

                    } else {
                        dateMarkHours[dueDate] = [
                            ...Array.from({ length: (toHour - fromHour + 1) }).map((_, index) => fromHour + index),
                            ...dateMarkHours[dueDate],
                        ];

                    }
                } else {
                    dateMarkHours[dueDate] = Array.from({ length: (toHour - fromHour + 1) }).map((_, index) => fromHour + index);
                }
            }

            const newTask = new Task({
                assignee: randomUserId,
                description: getRandomBoolean() ? getRandomString() : '',
                directory: directories[Math.floor(Math.random() * directories.length)],
                dueDate: `${randomDate.getDate().toString().toString().padStart(2, '0')}.${(randomDate.getMonth() + 1).toString().padStart(2, '0')}.${randomDate.getFullYear()}`,
                name: getRandomString(3, 20),
                priority: priorities[Math.floor(Math.random() * priorities.length)].statusName as PriorityType,
                status: statuses[Math.floor(Math.random() * statuses.length)].statusName as StatusType,
                subtasks: this.generateSubtasks(),
                categoryId: categoryIds[Math.floor(Math.random() * categoryIds.length)],
                comments: [],
                fromHour,
                toHour,
                projectId: new ObjectId(projectId),
            });

            const checkTask = await Task.findOne({
                fromHour: { $gte: fromHour },
                toHour: { $lte: toHour },
                dueDate: newTask.dueDate,
                assignee: newTask.assignee,
            });

            if (checkTask) {
                console.log(checkTask)
                continue;
            }

            const task = await newTask.save();
            if (task) {
                const taskId = task._id.toString();
                const commentIds = await CommentActions.generateComments(projectId, taskId, userIds);
                task.comments = commentIds;
                task.save();
            }

            taskIds.push(task._id);
        }


        return { userIds, taskIds };
    },

    generateSubtasks(min = 1, max = 10): string[] {
        const subtasks = [] as string[];
        const isNeedToGenerate = getRandomBoolean(0.3);

        if (!isNeedToGenerate) {
            return subtasks;
        }

        const targetCount = getRandomInt(min, max);

        for (let index = 0; index < targetCount; index++) {
            subtasks.push(getRandomString(3, 50));
        }

        return subtasks;
    },

    async deleteGeneratedTasks(projectId: string) {
        await connectDB();

        const result = await Task.deleteMany({ projectId: projectId });
    },


};