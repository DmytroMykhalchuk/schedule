import { get } from "http";
import connectDB from "../connectDB";
import Project from "../models/Project";
import User from "../models/User";
import { getRandomBoolean, getRandomInt, getRandomString } from "../utils/utils";
import { UserActions, UserTeamItemType } from "./UserActions";
import { priorities, requiredDateLength, statuses } from "../constants";
import dayjs from "dayjs";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

type ProjectDB = {
    directories: string[]
    name: string,
    admin_google_id: string,
}
type StoreProjectType = {
    name: string,
};

type ProjectUsers = {
    name: string,
    _id: string,
    picture: string,
    email: string
};

type StoreTaskType = {
    name: string,
    assignee: string | null,
    status: string,
    directory: string | null,
    dueDate: string,
    priority: string,
    description: string,
    subtasks: string[] | null,
    comment?: string | null
};

type TaskType = StoreTaskType & { _id: string }
type UrgentTaskType = Pick<TaskType, '_id' | 'name' | 'dueDate'>

export const ProjectActions = {
    async storeProject(project: StoreProjectType, sessionId: string): Promise<string> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(sessionId);

        const person = new Project({
            name: project.name,
            admin_id: user._id,
        });
        const result = await person.save();
        return result._id as string;
    },

    async storeDirectory(directoryName: string, projectId: string) {
        await connectDB();

        const result = await Project.findOneAndUpdate({ _id: projectId },
            {
                $push: {
                    directories: directoryName
                },
            });
    },

    async getProjectUsers(projectId: string): Promise<ProjectUsers[]> {
        await connectDB();

        const project = await Project.findOne({ _id: projectId }, { admin_id: true, users: true });
        const usersIds = project.users || [];
        usersIds.push(project.admin_id);

        const users = await UserActions.getUsersByIds(usersIds, { _id: true, name: true, picture: true, email: true });

        return users;
    },

    async getProjectDirectories(projectId: string): Promise<string[]> {
        await connectDB();

        const project = await Project.findOne({ _id: projectId }, { directories: true });

        return project.directories;
    },

    async getDirectories(projectId: string): Promise<string[]> {
        await connectDB();
        const project = await Project.findOne({ _id: projectId });
        return project.directories
    },

    async storeTask(auth: { projectId: string, sessionId: string }, task: StoreTaskType): Promise<{ projectId?: string }> {
        await connectDB();
        const user = await UserActions.getUserBySessionId(auth.sessionId);

        const project = await ProjectActions.getProjectByFilters(auth, { tasks: 1 });
        project.tasks.push({
            _id: new ObjectId(),
            name: task.name,
            assignee: task.assignee,
            status: task.status,
            directory: task.directory,
            dueDate: task.dueDate,
            priority: task.priority,
            description: task.description,
            subtasks: task.subtasks,
            comments: task.comment
                ? [{
                    _id: new ObjectId(),
                    userId: user._id,
                    name: user.name,
                    picture: user.picture,
                    text: task.comment,
                }]
                : []
        });

        project.save();

        return { projectId: project?._id };
    },

    async generateDirectories(projectId: string, count = 12): Promise<string[]> {
        await connectDB();
        const generatedDirectories = [] as string[];
        for (let index = 0; index < count; index++) {
            generatedDirectories.push(getRandomString(3, 15));
        }

        const result = await Project.findOneAndUpdate({ _id: projectId, }, { $push: { directories: generatedDirectories } });

        return generatedDirectories;

    },

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
        //@ts-ignore
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

    async getUrgentTasks(projectId: string, sessionId: string): Promise<UrgentTaskType[]> {
        await connectDB();
        const user = await UserActions.getUserBySessionId(sessionId);

        const project = await Project.findOne({ _id: projectId, users: user._id }, { 'tasks.name': 1, 'tasks.dueDate': 1, });

        const requiredDates = [
            dayjs().format('DD.MM.YYYY'),
            dayjs().add(1, 'day').format('DD.MM.YYYY'),
            dayjs().add(2, 'day').format('DD.MM.YYYY'),
        ];

        const urgentsTasks =
            project.tasks?.filter((item: { dueDate: string }) => requiredDates.includes(item.dueDate))
                .sort((a: { dueDate: string }, b: { dueDate: string }) => a.dueDate.localeCompare(b.dueDate))
            || [];

        return urgentsTasks;
    },

    async genearateRandomTasks(projectId: string, count = 350, maxDayCount = 30): Promise<void> {
        await connectDB();
        const users = await User.find();
        const directories = await this.generateDirectories(projectId);
        const userIds = [] as string[];
        const tasks = [] as StoreTaskType[];

        for (let index = 0; index < count; index++) {
            const randomDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * getRandomInt(1, maxDayCount)));
            const randomUserId = users[Math.floor(Math.random() * users.length)]._id;

            const newTask: StoreTaskType & { _id: mongoose.Types.ObjectId } = {
                _id: new ObjectId(),
                assignee: randomUserId,
                description: getRandomBoolean() ? getRandomString() : '',
                directory: directories[Math.floor(Math.random() * users.length)],
                dueDate: `${randomDate.getFullYear()}.${(randomDate.getMonth() + 1).toString().padStart(2, '0')}.${randomDate.getDate().toString().toString().padStart(2, '0')}`,
                name: getRandomString(3, 20),
                priority: priorities[Math.floor(Math.random() * priorities.length)].statusName,
                status: statuses[Math.floor(Math.random() * statuses.length)].statusName,
                subtasks: generateSubtasks(),
            };

            userIds.push(randomUserId);
            tasks.push(newTask);
        }
        const result = await Project.findOneAndUpdate({ _id: projectId }, { $push: { tasks: tasks, users: userIds } })
    },

    async getTeam(projectId: string, sessionId: string): Promise<UserTeamItemType[]> {
        await connectDB();
        const user = await UserActions.getUserBySessionId(sessionId);

        const project = await Project.findOne({ _id: projectId, users: user._id }, { team: 1 });
        if (!project._id) {
            return [];
        }
        const userIdRoleMap = {} as any;
        const userIds = project.team.map((user: { id: string, role: string }) => {
            userIdRoleMap[user.id] = user.role
            return user.id
        });

        const users = await UserActions.getUsersByIds(userIds);

        const result = [] as UserTeamItemType[];

        users.forEach((user) => {
            const role = userIdRoleMap[user._id];
            role && result.push({
                name: user.name,
                _id: user._id,
                email: user.email,
                picture: user.picture,
                role,
            })
        });

        return result;
    },

    async getProjectByFilters(filter: { projectId: string, sessionId: string, otherFilters?: {} }, projectFieldMask = {} as {}) {
        await connectDB();

        const preparedFilter: any = filter?.otherFilters ? { ...filter?.otherFilters } : {};
        const user = await UserActions.getUserBySessionId(filter.sessionId);

        preparedFilter._id = filter.projectId;
        preparedFilter.users = user._id;

        const project = Project.findOne(preparedFilter, { ...projectFieldMask })

        return project;
    },

};

const generateSubtasks = (min = 1, max = 10): string[] => {
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
};