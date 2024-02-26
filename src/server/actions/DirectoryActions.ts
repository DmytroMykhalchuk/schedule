import { ProccessStatusType, AuthType, DirectoryType, UpdateDirectoryType } from './types';
import connectDB from "../connectDB";
import Project from "../models/Project";
import { ProjectActions } from './ProjectActions';
import { ObjectId } from 'mongodb';
import User from '../models/User';
import { UserActions } from './UserActions';
import Directory from '../models/Directory';
import { getRandomString } from '../utils/utils';
import { TaskActions } from './TaskActions';

export const DirectoryActions = {
    async storeDirectory(directoryName: string, projectId: string): Promise<ProccessStatusType> {
        await connectDB();

        const directoryModel = new Directory({
            _id: new ObjectId(),
            name: directoryName,
        });

        const directory = await directoryModel.save();

        ProjectActions.addDirectoryId(projectId, directory._id);

        return { success: true };
    },

    async getDirectories(auth: AuthType): Promise<DirectoryType[]> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(auth.sessionId);

        const project = await Project.findOne({ _id: auth.projectId, users: user._id }).populate('directories');

        return project?.directories || []
    },

    async getDirectory(directoryId: string): Promise<DirectoryType> {
        await connectDB();

        const directory = await Directory.findOne({ _id: directoryId });

        return directory;
    },

    async updateDirectory(updateDirectory: UpdateDirectoryType): Promise<ProccessStatusType> {
        await connectDB();

        const directory = await Directory.findOneAndUpdate({ _id: updateDirectory.directoryId }, {
            name: updateDirectory.directoryName,
        });

        return { success: Boolean(directory) };
    },

    async deleteDirectory(directoryId: string): Promise<ProccessStatusType> {
        await connectDB();

        const directory = await Directory.findOneAndDelete({ _id: directoryId });

        return { success: Boolean(directory) };
    },

    async generateDirectories(projectId: string, count = 12): Promise<string[]> {
        await connectDB();
        const generatedDirectories = [] as string[];
        for (let index = 0; index < count; index++) {
            const directoryName = getRandomString(3, 15);

            const directoryModel = new Directory({
                _id: new ObjectId(),
                name: directoryName,
            });

            const directory = await directoryModel.save();
            generatedDirectories.push(directory._id);
        }

        const result = await Project.findOneAndUpdate({ _id: projectId, }, { $push: { directories: generatedDirectories } });

        return generatedDirectories;

    },

    async deleteDirectories(directoryIds: string[]) {
        await connectDB();

        await Directory.deleteMany({ _id: directoryIds });
    },

    async getDirectoryAndTasks(authParams: AuthType, directoryId: string) {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams, { categories: 1 });

        if (!project) {
            return {};
        }
        const directory = await Directory.findOne({ _id: directoryId }).orFail();

        const tasks = await TaskActions.getTasksByDirectory(project._id, directory._id, project.categories);
        return { tasks, directory };
    },

};