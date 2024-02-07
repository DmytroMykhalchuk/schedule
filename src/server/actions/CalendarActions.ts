import dayjs from "dayjs";
import connectDB from "../connectDB";
import Project from "../models/Project";
import { ProjectActions } from "./ProjectActions";
import { TaskDB, TaskShortType } from "./TaskActions";
import { UserActions } from "./UserActions";

export const CalendarActions = {
    async getMonthTaskDays(projectId: string, sessionId: string, findDate: string): Promise<number[]> {
        await connectDB();
        const user = await UserActions.getUserBySessionId(sessionId);
        if (!user?._id) {
            return [];
        }
        const formattedDate = findDate?.slice(0, -2);
        const result = await Project.findOne({
            _id: projectId,
            users: user._id,
        }, {
            'tasks': 1,
        });

        const requiredDays = [] as number[];
        result.tasks.forEach((task: { dueDate: string }) => {
            if (task.dueDate.includes(formattedDate)) {
                requiredDays.push(+task.dueDate.slice(-2));
            }
        });

        const uniqueDays = requiredDays.filter((value, index, array) => {
            return array.indexOf(value) === index;
        });
        return uniqueDays;
    },
    async getWeekTasks(auth: { projectId: string, sessionId: string }, data: string): Promise<TaskShortType[]> {
        await connectDB();
        const dateMark = dayjs(data);

        const rquiredDates = [
            dateMark.day(1).format('DD.MM.YYYY'),
            dateMark.day(2).format('DD.MM.YYYY'),
            dateMark.day(3).format('DD.MM.YYYY'),
            dateMark.day(4).format('DD.MM.YYYY'),
            dateMark.day(5).format('DD.MM.YYYY'),
        ];

        const project = await ProjectActions.getProjectByFilters(auth, { tasks: 1 });

        const targetTasks: TaskShortType[] = project?.tasks
            .filter((task: TaskDB) => rquiredDates.includes(task.dueDate))
            .map((task: TaskDB) => ({
                taskId: task._id.toString(),
                name: task.name,
                dueDate: task.dueDate,
                status: task.status,
                directory: task.directory,
                priority: task.priority,
            }));

        return targetTasks;
    },
}