import { get } from "http";
import connectDB from "../connectDB";
import Project from "../models/Project";
import User from "../models/User";
import { getRandomBoolean, getRandomInt, getRandomString } from "../utils/utils";
import { UserActions } from "./UserActions";
import { priorities, statuses } from "../constants";

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

    async generateDirectories(projectId: string, count = 12): Promise<string[]> {
        await connectDB();
        const generatedDirectories = [] as string[];
        for (let index = 0; index < count; index++) {
            generatedDirectories.push(getRandomString(3, 15));
        }

        const result = await Project.findOneAndUpdate({ _id: projectId, }, { $push: { directories: generatedDirectories } });
        
        return generatedDirectories;

    },

    async genearateRandomTasks(projectId: string, count = 50, maxDayCount = 30): Promise<void> {
        await connectDB();
        const users = await User.find();
        const directories = await this.generateDirectories(projectId);
        const userIds = [] as string[];
        const tasks = [] as StoreTaskType[];

        for (let index = 0; index < count; index++) {
            const randomDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * getRandomInt(1, maxDayCount)));
            const randomUserId = users[Math.floor(Math.random() * users.length)]._id;

            const newTask: StoreTaskType = {
                assignee: randomUserId,
                description: getRandomBoolean() ? getRandomString() : '',
                directory: directories[Math.floor(Math.random() * users.length)],
                dueDate: `${randomDate.getFullYear()}.${randomDate.getMonth() + 1}.${randomDate.getDate()}`,
                name: getRandomString(3, 20),
                priority: priorities[Math.floor(Math.random() * priorities.length)].statusName,
                status: statuses[Math.floor(Math.random() * statuses.length)].statusName,
                subtasks: generateSubtasks(),
            };

            userIds.push(randomUserId);
            tasks.push(newTask);
        }
        const result = await Project.findOneAndUpdate({ _id: projectId }, { $push: { tasks: tasks, users: userIds } })
    }
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