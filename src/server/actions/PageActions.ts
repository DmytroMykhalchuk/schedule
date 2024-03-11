import { SearchAnwserType } from '@/server/types/pageTypes';
import { RevenueActions } from '@/server/actions/RevenueActions';
import { searchAnwserLmit, workHours } from './../constants';
import dayjs, { Dayjs } from 'dayjs';
import connectDB from '../connectDB';
import { ProjectActions } from './ProjectActions';
import { TaskActions } from './TaskActions';
import { UserActions } from './UserActions';
import { AuthType, TaskFilters, ReportPageInfoType, CategoryDB, MonthProgressType, CategoryRecord, TaskDB, CommentDB, CommentType } from './types';
import { translateDateToDayjs } from '@/utlis/translateDateToDayjs';
import Project from '../models/Project';
import { getFillingMonthPrecentage } from '@/utlis/getFillingMonthPrecentage';
import Directory from '../models/Directory';
import Task from '../models/Task';
import Comment from '../models/Comment';
import User from '../models/User';
import { TaskInfoDB, TaskInfoRecord } from '../types/taskTypes';
import { UserInfoDB, UserInfoRecord } from '../types/userTypes';
import { DirectoryDB, DirectoryRecord } from '../types/directoryTypes';

export const PageActions = {
    async getChartsInfo(authParams: AuthType): Promise<ReportPageInfoType> {
        await connectDB();
        const currentDate = dayjs();

        const user = await UserActions.getUserByEmail(authParams.email);

        const authUserId = user._id.toString();
        const project = await Project.findOne({ _id: authParams.projectId, users: authUserId }, { directories: 1, users: 1 }).populate('categories');


        if (!project) {
            return {} as ReportPageInfoType;
        };

        const tasks = await TaskActions.getTasksByProjectId(project._id, { assignee: 1, fromHour: 1, toHour: 1, dueDate: 1, categoryId: 1 });
        //todo due date to timestamp
        //@ts-ignore
        const prevTasks = tasks.filter(task => translateDateToDayjs(task.dueDate).diff(currentDate) <= 0).map(item => ({ ...item, dueDate: translateDateToDayjs(item.dueDate) })) as TaskFilters[];

        const categoriesProgress = {
        } as {
            [categoryId: string]: Dayjs[]
        };

        const monthWorkHours = {} as { [month: string]: number }
        const weekWorkHours = {} as { [day: string]: number }

        const lastMonth = currentDate;
        const firstMonth = currentDate.subtract(2, 'month');
        const requiredMonths = [
            +currentDate.format('M'),
            +currentDate.subtract(1, 'month').format('M'),
            +currentDate.subtract(2, 'month').format('M'),
        ];

        prevTasks.forEach((task) => {
            const month = task.dueDate.month() + 1;
            if (requiredMonths.includes(month)) {
                const categoryId = task.categoryId?.toString();

                if (categoriesProgress.hasOwnProperty(categoryId)) {
                    categoriesProgress[categoryId].push(task.dueDate);
                } else {
                    categoriesProgress[categoryId] = [task.dueDate];
                }
            };

            if (task.assignee?.toString() === authUserId) {
                if (monthWorkHours.hasOwnProperty(month)) {
                    monthWorkHours[month] += task.toHour - task.fromHour;
                } else {
                    monthWorkHours[month] = task.toHour - task.fromHour;
                }

                if (currentDate.isSame(task.dueDate, 'week')) {
                    const dayOfWeek = task.dueDate.day() - 1;
                    if (weekWorkHours.hasOwnProperty(dayOfWeek)) {
                        weekWorkHours[dayOfWeek] += task.toHour - task.fromHour;
                    } else {
                        weekWorkHours[dayOfWeek] = task.toHour - task.fromHour;
                    }
                }
            }

        });

        const progress = {} as MonthProgressType;

        for (const categoryId in categoriesProgress) {
            if (Object.prototype.hasOwnProperty.call(categoriesProgress, categoryId)) {
                const element = categoriesProgress[categoryId];
                progress[categoryId] = getFillingMonthPrecentage(element, firstMonth, lastMonth);
            }
        }

        const revenue = await RevenueActions.getYearRevenue(project._id);

        const result = {
            projectCount: project.directories.length,
            userCount: project.users.length,
            progress,
            monthWorkHours,
            weekWorkHours,
            categories: project.categories.map((category: any) => ({
                ...category.toObject(),
                _id: category._id.toString(),
            })),
            revenue,
        };

        return result;
    },

    async makeSearch(auth: AuthType, searchText: string): Promise<SearchAnwserType> {
        await connectDB();

        const project = (await ProjectActions.getProjectByFilters(auth))?.toObject();

        if (!project) {
            throw new Error();
        }
        const regex = new RegExp(searchText, 'i');

        const categories: CategoryRecord[] = project.categories.filter((category: CategoryDB) => category.name.includes(searchText)).map((item: CategoryDB) => ({ ...item, _id: item._id.toString() }));
        const invitations = project.invitations.filter((inviteCode: string) => inviteCode.includes(searchText));

        const directories: DirectoryRecord[] = (
            await Directory.find({ _id: { $in: project.directories }, name: regex }).limit(searchAnwserLmit).lean() as DirectoryDB[]
        ).map(item => ({
            ...item,
            _id: item._id.toString(),
        }));

        const tasks: TaskInfoRecord[] = (
            await Task.find(
                { projectId: project._id, name: regex },
                { name: 1, directory: 1, status: 1, priority: 1, dueDate: 1 }
            )
                .limit(searchAnwserLmit).lean() as TaskInfoDB[])
            .map((task: TaskInfoDB) => ({ ...task, taskId: task._id.toString() } as TaskInfoRecord));

        const comments: CommentType[] = (
            await Comment.find({ projectId: project._id, text: regex }
            )
                .limit(searchAnwserLmit).lean() as CommentDB[])
            .map((item) => ({
                ...item,
                _id: item._id.toString(),
                userId: item.userId.toString(),
                projectId: item.projectId.toString(),
                taskId: item.taskId.toString(),
                isOwner: false,
            }));

        const users: UserInfoRecord[] = (
            await User.find({
                _id: { $in: project.users, },
                $or: [
                    { name: regex },
                    { email: regex }
                ]
            }, {
                name: 1, email: 1, picture: 1
            }).limit(searchAnwserLmit).lean() as UserInfoDB[]
        ).map(item => ({ ...item, _id: item._id.toString() }));

        return {
            categories,
            comments,
            directories,
            tasks,
            invitations,
            users,
        }
    },
};
