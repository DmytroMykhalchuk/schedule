import dayjs from "dayjs";
import connectDB from "../connectDB";
import Project from "../models/Project";
import { ProjectActions } from "./ProjectActions";
import { UserActions } from "./UserActions";
import Task from "../models/Task";
import { TaskDB, TaskShortType, AuthType } from "./types";

export const CalendarActions = {
    async getMonthTaskDays(auth: AuthType, findDate: string): Promise<number[]> {
        await connectDB();
        const user = await UserActions.getUserByEmail(auth.email);
        const project = await ProjectActions.getProjectById(auth.projectId, { _id: 1 }, user._id);
        if (!project) {
            return [];
        }
        const formattedDate = findDate?.slice(2);
        const regex = new RegExp(formattedDate, 'i') // i for case insensitive
        const tasks = await Task.find({ projectId: project._id, dueDate: { $regex: regex } });

        const days = tasks.map(task => +task.dueDate.substr(0, 2))

        const uniqueDays = days.filter((value, index, array) => {
            return array.indexOf(value) === index;
        });

        return uniqueDays;
    },

    async getWeekTasks(auth: AuthType, data: string): Promise<TaskShortType[]> {
        await connectDB();
        const dateMark = dayjs(data);

        const requiredDates = [
            dateMark.day(1).format('DD.MM.YYYY'),
            dateMark.day(2).format('DD.MM.YYYY'),
            dateMark.day(3).format('DD.MM.YYYY'),
            dateMark.day(4).format('DD.MM.YYYY'),
            dateMark.day(5).format('DD.MM.YYYY'),
        ];

        const users = await UserActions.getUserByEmail(auth.email);
        const tasks = await Task.find({ dueDate: requiredDates, assignee: users._id });

        const targetTasks: TaskShortType[] = tasks
            .map((task: TaskDB) => ({
                taskId: task._id.toString(),
                name: task.name,
                dueDate: task.dueDate,
                status: task.status,
                directory: task.directory,
                fromHour: task.fromHour,
                toHour: task.toHour,
                priority: task.priority,
                _id: task._id.toString(),
            }));

        return targetTasks;
    },
}