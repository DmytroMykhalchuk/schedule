import { ByDirectoryOrCategoryTaskRecord } from '@/server/actions/types';
import connectDB from '../connectDB';
import dayjs from 'dayjs';
import mongoose from 'mongoose';
import Task from '../models/Task';
import User from '../models/User';
import {
    AuthType,
    ByDirectoryOrCategoryIdTaskDB,
    CategoryDB,
    CommentType,
    PriorityType,
    ProccessStatusType,
    StatusType,
    StoreCommentType,
    StoreTaskType,
    TaskByUserDB,
    TaskByUserRecord,
    TaskByUserUser,
    TaskDB,
    TaskShortType,
    TaskUpdateType,
    UrgentTask,
    ViewTaskType
} from './types';
import { CategoryActions } from './CategoryActions';
import { CommentActions } from './CommentActions';
import { getRandomBoolean, getRandomInt, getRandomString } from '../utils/utils';
import { getRandomWeekdayDate } from '@/utlis/getRandomWeekdayDate';
import { ObjectId } from 'mongodb';
import { priorities, statuses, workHours } from '../constants';
import { ProjectActions } from './ProjectActions';
import { UserActions } from './UserActions';
import Comment from '../models/Comment';
import { MailActions } from './MailActions';
import { translateDateToDayjs } from '@/utlis/translateDateToDayjs';

export const TaskActions = {
    async storeTask(auth: AuthType, storeTask: StoreTaskType): Promise<TaskDB | { wrongData: boolean }> {
        const canCreate = await this.isAvalableTaskInThisDate(storeTask.assignee, storeTask.dueDate, storeTask.fromHour, storeTask.toHour);
        if (!canCreate) {
            return { wrongData: true };
        }

        await connectDB();
        const user = await UserActions.getUserByEmail(auth.email);

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

        if (storeTask.assignee && user._id.toString() !== storeTask.assignee) {
            await MailActions.notifyAssigmentNewTask({ name: task.name, id: task._id }, task.assignee, user.name)
        }

        return task;
    },

    async getMyTasks(authParams: AuthType): Promise<TaskShortType[]> {
        await connectDB();

        const requiredDates = [
            dayjs().day(1).format('DD.MM.YYYY'),
            dayjs().day(2).format('DD.MM.YYYY'),
            dayjs().day(3).format('DD.MM.YYYY'),
            dayjs().day(4).format('DD.MM.YYYY'),
            dayjs().day(5).format('DD.MM.YYYY'),
        ];

        const user = await UserActions.getUserByEmail(authParams.email);
        const project = await ProjectActions.getProjectById(authParams.projectId, { _id: 1 }, user?._id);

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

        const user = await UserActions.getUserByEmail(auth.email);
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
                taskId: item.taskId.toString(),
                projectId: item.projectId.toString(),
            };
        });

        const handledTask: ViewTaskType = {
            ...task.toObject(),
            assignee: task.assignee?.toString(),
            _id: task._id.toString(),
            categoryId: task?.categoryId?.toString() || '',
            directory: task.directory ? task.directory.toString() : task.directory,
        };

        return { task: handledTask, comments: preparedCommnets };
    },

    async updateTask(auth: AuthType, updateTask: TaskUpdateType): Promise<{ success: boolean } | { wrongData: boolean }> {
        const canCreate = await this.isAvalableTaskInThisDate(updateTask.assignee, updateTask.dueDate, updateTask.fromHour, updateTask.toHour, updateTask.taskId);
        if (!canCreate) {
            return { wrongData: true };
        }

        await connectDB();

        const user = await UserActions.getUserByEmail(auth.email);
        const project = await ProjectActions.getProjectById(auth.projectId, { _id: 1 }, user._id);

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
            directory: updateTask.directory,
        });

        if (updateTask.assignee && user._id.toString() !== updateTask.assignee) {
            await MailActions.notifyAssigmentNewTask({ name: task.name, id: task._id }, task.assignee, user.name)
        }

        return { success: Boolean(task) };
    },

    async getUrgentTasks(authParams: AuthType): Promise<UrgentTask[]> {
        await connectDB();
        const user = await UserActions.getUserByEmail(authParams.email);
        const project = await ProjectActions.getProjectByFilters(authParams, { _id: 1 });

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

    async addCommentId(taskId: string, commentId: mongoose.Types.ObjectId): Promise<{ name: string, assignee: mongoose.Types.ObjectId | null, _id: mongoose.Types.ObjectId }> {
        await connectDB();

        const result = Task.findByIdAndUpdate(taskId, { $push: { comments: commentId } }, { name: 1, assignee: 1 });

        return result;
    },

    async getAllowedHours(auth: AuthType, date: string, userId: string | null, taskId?: string): Promise<number[]> {
        const selectedDay = translateDateToDayjs(date, 'DD.MM.YYYY');
        if (selectedDay.day(0).isSame(selectedDay, 'day') || selectedDay.day(6).isSame(selectedDay, 'day')) {
            return [];
        }
        await connectDB();
        const allowedHours = [...workHours];

        if (!userId) {
            return allowedHours;
        }

        const user = await User.findById(userId).orFail();
        const project = await ProjectActions.getProjectById(auth.projectId, {}, user._id.toString());

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
        await Comment.deleteMany({ taskId: task._id });

        return { success: Boolean(task) };
    },

    async generateTasks(projectId: string, adminId: string, count = 350, countTargetUsers = 3, limitDayCount = 30, isPast = false) {
        await connectDB();
        const project = await ProjectActions.getProjectById(projectId);

        const categoryIds = await CategoryActions.generateCategories(projectId);
        const directories = project.directories as string[];

        const users = await User.find();
        const shuffledUsers = users.sort(() => 0.5 - Math.random());
        let targetUsers = [...shuffledUsers.slice(0, countTargetUsers)];

        const taskIds = [] as mongoose.Types.ObjectId[];
        const userIds = [...targetUsers.map(item => item._id), project.admin_id] as mongoose.Types.ObjectId[];

        const dateMarkHours = {} as any;

        for (let index = 0; index < count; index++) {
            const randomDate = getRandomWeekdayDate(limitDayCount, isPast);
            const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

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

        return {
            userIds: userIds.filter(userId => userId.toString() !== adminId),
            taskIds
        };
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

    async getTaskByUser(authParams: AuthType) {
        await connectDB();

        const requiredDates = [
            dayjs().day(1).format('DD.MM.YYYY'),
            dayjs().day(2).format('DD.MM.YYYY'),
            dayjs().day(3).format('DD.MM.YYYY'),
            dayjs().day(4).format('DD.MM.YYYY'),
            dayjs().day(5).format('DD.MM.YYYY'),
        ];

        const project = await ProjectActions.getProjectByFilters(authParams, { _id: 1 });

        const tasks = await Task.find({ projectId: project?._id, dueDate: { $in: requiredDates } }, { dueDate: 1, name: 1, assignee: 1, status: 1, priority: 1, });

        const taskTree = {} as { [id: string]: TaskByUserDB[] };
        const noAssineeTasks = [] as TaskByUserDB[];
        const userIds = [] as string[];

        tasks.forEach(task => {
            if (task.assignee === null) {
                noAssineeTasks.push(task);
            } else {

                if (taskTree.hasOwnProperty(task.assignee)) {
                    taskTree[task.assignee].push(task.toObject());
                } else {
                    userIds.push(task.assignee);
                    taskTree[task.assignee] = [task.toObject()];
                }
            }
        });

        const users = await UserActions.getUsersByIds(userIds, { name: 1, picture: 1 });

        const result = {} as { [id: string]: { tasks: TaskByUserRecord[], user: TaskByUserUser } };

        for (const key in taskTree) {
            if (Object.prototype.hasOwnProperty.call(taskTree, key)) {
                const element = taskTree[key];
                const targetUser = users.find(user => user._id.toString() === key);

                if (!targetUser) { continue; }

                result[key] = {
                    tasks: element.map(task => ({ ...task, _id: task._id.toString() })),
                    user: {
                        _id: targetUser._id.toString(),
                        name: targetUser.name,
                        picture: targetUser.picture,
                    },
                }
            }
        }

        return { taskTree: result, noAssineeTasks };
    },

    async getTasksByProjectId(projectId: string, mask = {}, withUser = false) {
        await connectDB();
        let tasks = [] as { assignee: { name: string, email: string, picture: string }, directory: string }[];
        if (withUser) {
            tasks = await Task.find({ projectId }, mask).populate('assignee', 'picture email name').lean();
        } else {
            tasks = await Task.find({ projectId }, mask).lean();
        }
        return tasks;
    },

    async getTasksByDirectory(projectId: string, directoryId: string, categories: CategoryDB[]): Promise<ByDirectoryOrCategoryTaskRecord[]> {
        await connectDB();

        const tasks = await Task
            .find({ projectId: projectId, directory: directoryId }, { name: 1, assignee: 1, status: 1, dueDate: 1, priority: 1, categoryId: 1 })
            .populate('assignee', 'picture email name')
            .lean() as ByDirectoryOrCategoryIdTaskDB[];

        const preparedTasks = tasks.map((task) => {
            const category = categories.find(item => item._id.toString() === task.categoryId)
            return {
                ...task,
                assignee: {
                    ...task.assignee,
                    _id: task.assignee._id.toString(),
                },
                category: category,
                _id: task._id.toString(),
            }
        });
        return preparedTasks;
    },

    async getTasksByCategory(projectId: string, categoryId: string, categories: CategoryDB[]): Promise<ByDirectoryOrCategoryTaskRecord[]> {
        await connectDB();

        const tasks = await Task
            .find({ projectId, categoryId }, { name: 1, assignee: 1, status: 1, dueDate: 1, priority: 1, categoryId: 1 })
            .populate('assignee', 'picture email name')
            .lean() as ByDirectoryOrCategoryIdTaskDB[];

        const preparedTasks = tasks.map((task) => {
            const category = categories.find(item => item._id.toString() === task.categoryId)
            return {
                ...task,
                assignee: {
                    ...task.assignee,
                    _id: task.assignee._id.toString(),
                },
                category: category,
                _id: task._id.toString(),
            }
        });
        return preparedTasks;
    },

    async isAvalableTaskInThisDate(assignee: string | null, dueDate: string, fromHour: number, toHour: number, taskId?: string): Promise<boolean> {
        if (!assignee) return true;

        if (fromHour >= toHour) return false;

        await connectDB();

        const tasks = await Task.find({ assignee, dueDate }, { fromHour: 1, toHour: 1 }).lean() as { _id: mongoose.Types.ObjectId, fromHour: number, toHour: number }[];
        let isAvailable = true;

        tasks.forEach(task => {
            if (taskId === task._id.toString()) {
                return;
            }
            if (

                (fromHour >= task.fromHour && fromHour < task.toHour)
                || (toHour > task.fromHour && toHour < task.toHour)

            ) {
                isAvailable = false;
            }
        });

        return isAvailable;
    },

};