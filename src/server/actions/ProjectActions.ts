import connectDB from '../connectDB';
import mongoose from 'mongoose';
import Project from '../models/Project';
import User from '../models/User';
import { AuthType, StoreTaskType } from './types';
import { getRandomBoolean, getRandomInt, getRandomString } from '../utils/utils';
import { ObjectId } from 'mongodb';
import { priorities, statuses } from '../constants';
import { UserActions, UserTeamItemType } from './UserActions';

type StoreProjectType = {
    name: string,
};

type ProjectUsers = {
    name: string,
    _id: string,
    picture: string,
    email: string
};

export const ProjectActions = {
    async storeProject(project: StoreProjectType, sessionId: string) {
        await connectDB();
        const user = await UserActions.getUserBySessionId(sessionId, { _id: 1, });

        const modelProject = new Project({
            name: project.name,
            admin_id: user._id,
            users: [user._id],
            team: [{ role: 'boss', id: user._id }]
        });

        const result = await modelProject.save();

        return result._id.toString();
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

    async generateDirectories(projectId: string, count = 12): Promise<string[]> {
        await connectDB();
        const generatedDirectories = [] as string[];
        for (let index = 0; index < count; index++) {
            generatedDirectories.push(getRandomString(3, 15));
        }

        const result = await Project.findOneAndUpdate({ _id: projectId, }, { $push: { directories: generatedDirectories } });

        return generatedDirectories;

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

    async getTeam(auth: AuthType): Promise<UserTeamItemType[]> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(auth.sessionId);
        const project = await Project.findOne({ _id: auth.projectId, users: user._id }, { team: 1 });
        

        if (!project?._id) {
            return [];
        }

        const userIdRoleMap = {} as any;
        const userIds = project.team.map((user: { _id: mongoose.Types.ObjectId, role: string }) => {
            const userId = user._id.toString();
            userIdRoleMap[userId] = user.role
            return userId;
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

    async getProjectById(projectId: string, selector = {}, userId?: string) {
        await connectDB();

        const filter = userId
            ? { _id: projectId, users: userId }
            : { _id: projectId };

        const project = Project.findOne(filter, selector)

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