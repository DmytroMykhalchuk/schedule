import connectDB from '../connectDB';
import mongoose from 'mongoose';
import Project from '../models/Project';
import User from '../models/User';
import { AuthType, StoreTaskType, ProjectUsers, ProjectTeamItem, UserTeamItemType, PopulatedProjectTeamItem, TeamItemType, TaskDB, PriorityType, StatusType } from './types';
import { getRandomBoolean, getRandomInt, getRandomString } from '../utils/utils';
import { ObjectId } from 'mongodb';
import { priorities, statuses } from '../constants';
import { UserActions } from './UserActions';
import { TaskActions } from './TaskActions';

type StoreProjectType = {
    name: string,
};

export const ProjectActions = {
    async storeProject(project: StoreProjectType, sessionId: string) {
        await connectDB();
        const user = await UserActions.getUserBySessionId(sessionId, { _id: 1, });

        const modelProject = new Project({
            name: project.name,
            admin_id: user._id,
            users: [user._id],
            team: [{ role: 'boss', userId: user._id }]
        });

        const result = await modelProject.save();

        return result._id.toString();
    },

    async getProjectUsers(projectId: string, isRequiredRolelessUsers = false): Promise<ProjectUsers[]> {
        await connectDB();
        const project = await Project.findOne({ _id: projectId }, { admin_id: 1, users: 1, team: 1 });

        let userIds = project.users || [];

        if (isRequiredRolelessUsers) {
            const withRoleUserIds = project.team.map((teamMember: ProjectTeamItem) => teamMember.userId.toString());
            userIds = userIds.filter((id: mongoose.Types.ObjectId) => !withRoleUserIds.includes(id.toString()))
        }

        const users = await UserActions.getUsersByIds(userIds, { name: 1, picture: 1, email: 1 });

        return users;
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
        await this.generateDirectories(projectId);

        const { userIds, taskIds } = await TaskActions.generateTasks(projectId);

        const result = await Project.findOneAndUpdate({ _id: projectId }, { $push: { tasks: taskIds, users: userIds } })
    },

    async getTeam(auth: AuthType): Promise<TeamItemType[]> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(auth.sessionId);
        const project = await Project.findOne({ _id: auth.projectId, users: user._id }, { team: 1 }).populate('team.userId');

        if (!project?._id) {
            return [];
        }

        const result: TeamItemType[] = project.team.map((user: PopulatedProjectTeamItem): TeamItemType => ({
            user: user.userId,
            role: user.role,
            isAdmin: false,

        }));


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

    async addDirectoryId(projectId: string, directoryId: mongoose.Types.ObjectId) {
        await connectDB();

        const result = await Project.findOneAndUpdate({ _id: projectId }, {
            $push: {
                directories: directoryId,
            }
        });
    },
};