import connectDB from "../connectDB";
import Project from "../models/Project";
import { UserActions } from "./UserActions";

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
}

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

        const users = await UserActions.getUsersByIds(usersIds, { _id: true, name: true, picture: true });

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

    async storeTask(projectId: String, task: StoreTaskType): Promise<void> {
        await connectDB();
        const result = await Project.findOneAndUpdate({ _id: projectId }, {
            $push: {
                tasks: task,
            }
        });
    },
};