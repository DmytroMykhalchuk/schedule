import { workHours } from './../constants';
import dayjs from 'dayjs';
import connectDB from '../connectDB';
import { ProjectActions } from './ProjectActions';
import { TaskActions } from './TaskActions';
import { UserActions } from './UserActions';
import { AuthType, TaskFilters, ReportPageInfoType, CategoryDB } from './types';
import { translateDateToDayjs } from '@/utlis/translateDateToDayjs';
import Project from '../models/Project';

export const PageActions = {
    async getChartsInfo(authParams: AuthType): Promise<ReportPageInfoType> {
        await connectDB();
        const currentDate = dayjs();
        const currentDateStamp = currentDate.format('DD.MM.YYYY');

        const user = await UserActions.getUserBySessionId(authParams.sessionId);
        const authUserId = user._id.toString();
        const project = await Project.findOne({ _id: authParams.projectId, users: authUserId }, { directories: 1, users: 1 }).populate('categories');


        if (!project) {
            return {} as ReportPageInfoType;
        };

        const tasks = await TaskActions.getTasksByProjectId(project._id, { assignee: 1, fromHour: 1, toHour: 1, dueDate: 1, categoryId: 1 });
        // console.log(tasks)
        //todo due date to timestamp
        const prevTasks = tasks.filter(task => translateDateToDayjs(task.dueDate).diff(currentDate) <= 0).map(item => ({ ...item, dueDate: translateDateToDayjs(item.dueDate) })) as TaskFilters[];

        const progress = {
        } as {
            [categoryId: string]: { [month: number]: number[] }
        };

        const monthWorkHours = {} as { [month: string]: number }
        const weekWorkHours = {} as { [day: string]: number }

        const requiredMonths = [
            +currentDate.format('M'),
            +currentDate.subtract(1, 'month').format('M'),
            +currentDate.subtract(2, 'month').format('M'),
        ];

        prevTasks.forEach((task) => {
            const month = task.dueDate.month() + 1;
            if (requiredMonths.includes(month)) {
                const categoryId = task.categoryId.toString();
                if (progress.hasOwnProperty(categoryId) && progress[categoryId].hasOwnProperty(month)) {
                    progress[categoryId][month].push(task.dueDate.date());
                } else {
                    progress[categoryId] = {
                        [month]: [task.dueDate.date()],
                    };
                }
            };

            if (monthWorkHours.hasOwnProperty(month)) {
                monthWorkHours[month] += task.toHour - task.fromHour;
            } else {
                monthWorkHours[month] = task.toHour - task.fromHour;
            }

            if (task.assignee.toString() === authUserId && currentDate.isSame(task.dueDate, 'week')) {
                const dayOfWeek = task.dueDate.day();
                if (weekWorkHours.hasOwnProperty(dayOfWeek)) {
                    weekWorkHours[dayOfWeek] += task.toHour - task.fromHour;
                } else {
                    weekWorkHours[dayOfWeek] = task.toHour - task.fromHour;
                }
            }

        });

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
        };

        return result;
    },
};
