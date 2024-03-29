import { cancelSubcription, checkIsActive, payment } from './../services/stripe';
import { initPayment } from './../../app/[locale]/app/settings/actions';
import { RevenueActions } from '@/server/actions/RevenueActions';
import connectDB from '../connectDB';
import mongoose from 'mongoose';
import Project from '../models/Project';
import { AuthType, PopulatedProjectTeamItem, ProccessStatusType, ProjectTeamItem, ProjectUsers, TeamItemType } from './types';
import { CommentActions } from './CommentActions';
import { DirectoryActions } from './DirectoryActions';
import { ProjectListAvailableDB } from '../types/projectTypes';
import { ProjectListAvailableRecord } from './../types/projectTypes';
import { TaskActions } from './TaskActions';
import { UserActions } from './UserActions';
import User from '../models/User';

type StoreProjectType = {
    name: string,
};

export const ProjectActions = {
    async storeProject(project: StoreProjectType, email: string) {
        await connectDB();
        const user = await UserActions.getUserByEmail(email, { _id: 1, });

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

        const projectUsers = users.map(user => ({
            ...user,
            _id: user._id.toString(),
        }));

        return projectUsers;
    },

    async getTeam(auth: AuthType): Promise<TeamItemType[]> {
        await connectDB();

        const user = await UserActions.getUserByEmail(auth.email);
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

    async getProjectByFilters(filter: { projectId: string, email: string, otherFilters?: {} }, projectFieldMask = {} as {}) {
        await connectDB();

        const preparedFilter: any = filter?.otherFilters ? { ...filter?.otherFilters } : {};
        const user = await UserActions.getUserByEmail(filter.email);

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

        const project = Project.findOne(filter, selector);

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

    async genearateRandomTasks(projectId: string, count = 350, maxDayCount = 30): Promise<void> {
        await connectDB();
        const project = await Project.findById(projectId);

        await DirectoryActions.generateDirectories(projectId);

        const { userIds: nextUserIds, taskIds: nextTaskIds } = await TaskActions.generateTasks(projectId, project.admin_id.toString());
        const { userIds: beforeUserIds, taskIds: beforeTaskIds } = await TaskActions.generateTasks(projectId, project.admin_id.toString(), 365, 0, 365, true);
        await RevenueActions.genreateRevenues(project.admin_id.toString(), projectId);
        const result = await Project.findOneAndUpdate({ _id: projectId }, { $push: { tasks: [...nextTaskIds, ...beforeTaskIds], users: [...nextUserIds, ...beforeUserIds] } })
    },

    async removeGenerated(projectId: string): Promise<ProccessStatusType> {
        await connectDB();

        const project = await Project.findOne({ _id: projectId });
        if (!project) {
            return { success: false };
        }

        await DirectoryActions.deleteDirectories(project.directories);
        await TaskActions.deleteGeneratedTasks(projectId);
        await CommentActions.deleteGeneratedComments(projectId);
        await RevenueActions.deleteGenerated(projectId);

        project.directories = [];
        project.categories = [];

        project.users = project.users.filter((user: mongoose.Types.ObjectId) => user.toString() === project.admin_id.toString());
        project.team = project.team.filter((user: { userId: mongoose.Types.ObjectId }) => user.userId.toString() === project.admin_id.toString());
        project.save();

        return { success: true };
    },

    async getAvailableProjects(userId: string): Promise<ProjectListAvailableRecord[]> {
        await connectDB();

        const projects = await Project.find({ users: userId }, { name: 1 }).lean() as ProjectListAvailableDB[];

        return projects.map((project) => ({
            ...project,
            _id: project._id.toString(),
        }));
    },

    async initPayment(auth: AuthType) {
        await connectDB();
        const project = await this.getProjectByFilters(auth, { premium: 1, admin_id: 1 });

        const author = await User.findById(project.admin_id, { email: 1, name: 1 }).orFail();

        const session = await payment(author.name, author.email)

        project.premium.payment.sessionId = session.id;
        await project.save();

        return session.url;
    },

    async checkPayment(projectId: string): Promise<{ isActive: boolean }> {
        await connectDB();

        const project = await Project.findById(projectId, { premium: 1 });

        const info = await checkIsActive(project.premium.payment?.sessionId);
        if (info.isActive) {
            project.premium.payment.subscriptionId = info.subscriptionId;
            project.premium.isActive = true;
            await project.save();

            return { isActive: true };
        }

        return { isActive: false };
    },

    async cancelPremium(auth: AuthType): Promise<ProccessStatusType> {
        await connectDB();
        const project = await this.getProjectByFilters(auth, { premium: 1 });

        const result = await cancelSubcription(project.premium.payment.subscriptionId)

        if (result.success) {
            project.premium.isActive = false;
            project.premium.payment = {
                subscriptionId: null,
                sessionId: null,
                lastPayment: null,
            };

            await project.save();
        }

        return result;
    },

    async getHasPremium(auth: AuthType): Promise<{ hasPremium: boolean }> {
        await connectDB();
        const project = await this.getProjectByFilters(auth, { premium: 1 });

        return { hasPremium: project.premium.isActive };
    },
};