import { ProjectListAvailableRecord } from './../types/projectTypes';
import { ProjectActions } from '@/server/actions/ProjectActions';
import { UserLoginResponse } from './../types/userTypes';
import { StoreUser, UserDB } from './types';
import connectDB from "../connectDB";
import User from "../models/User";
import { getRandomNumber, getRandomPictureUrl } from "../utils/utils";


export const UserActions = {
    async login(loginUser: StoreUser): Promise<UserLoginResponse> {
        await connectDB();

        const targetUser = await User.findOne({ googleId: loginUser.googleId });

        if (targetUser) {
            targetUser.name = loginUser.name;
            targetUser.picture = loginUser.picture;
            targetUser.locale = loginUser.locale;
            await targetUser.save();

            return {
                id: targetUser._id.toString(),
                image: targetUser.picture,
                name: targetUser.name,
                email: targetUser.email,
                locale: targetUser.locale,
            };

        } else {
            const userModel = new User({ ...loginUser });
            const user = await userModel.save();
            return {
                id: user._id.toString(),
                image: user.picture,
                name: user.name,
                email: user.email,
                locale: user.locale,
            };
        }
    },

    async getUserByEmail(email: string, selector = {}) {
        await connectDB();

        const user = await User.findOne({ email }, selector).orFail();

        return user.toObject();
    },

    async getUsersByIds(ids: string[], mask = {} as any): Promise<UserDB[]> {
        await connectDB();
        const users = await User.find({ _id: { $in: ids } }, mask);

        return users.map(user => user.toObject());
    },

    async randomGenerate(count = 3): Promise<void> {
        await connectDB();

        const mailMask = 'example.user';
        const mailSufix = '@gmail.com';
        const nameMask = 'example.user';

        for (let index = 0; index < count; index++) {
            const person = new User({
                name: nameMask + getRandomNumber(),
                email: mailMask + getRandomNumber() + mailSufix,
                googleId: getRandomNumber(12),
                picture: getRandomPictureUrl(),
                sessions: [],
                locale: 'uk',
            });
            const result = await person.save();
        }
    },

    async getAvailableProjects(userEmail: string): Promise<ProjectListAvailableRecord[]> {
        await connectDB();
        const user = await this.getUserByEmail(userEmail, { _id: 1, locale: 1 });
        const projects = await ProjectActions.getAvailableProjects(user._id);

        return projects;
    },
};

