import { ProjectListAvailableRecord } from './../types/projectTypes';
import { ProjectActions } from '@/server/actions/ProjectActions';
import { UserLoginResponse } from './../types/userTypes';
import { StoreUser, UserDB } from './types';
import { getMaxListeners } from "events";
import connectDB from "../connectDB";
import User from "../models/User";
//@ts-ignore
import uniqid from 'uniqid';
import { getRandomNumber, getRandomPictureUrl } from "../utils/utils";


export const UserActions = {
    async login(loginUser: StoreUser): Promise<UserLoginResponse> {
        await connectDB();
        const targetUser = await User.findOne({ googleId: loginUser.googleId });

        if (targetUser) {
            targetUser.name = targetUser.name;
            targetUser.picture = targetUser.picture;
            targetUser.save();

            return {
                id: targetUser._id.toString(),
                image: targetUser.picture,
                name: targetUser.name,
                email: targetUser.email,
            };

        } else {
            const userModel = new User({ ...loginUser });
            const user = await userModel.save();
            return {
                id: user._id.toString(),
                image: user.picture,
                name: user.name,
                email: user.email,
            };
        }
    },

    async logout(sessionId: string) {
        await connectDB();
        const person = await User.findOneAndUpdate({
            sessions: {
                $in: [sessionId],
            },
        },
            { $pull: { sessions: sessionId } });
    },

    async updateSessionId(sessionId: string): Promise<{ sessionId: string }> {
        await connectDB();
        //todo ceheck update is still member in some project
        console.warn(sessionId)
        let uuid = uniqid();

        const response = await User.findOneAndUpdate({
            sessions: {
                $in: sessionId,
            },
        }, {
            $set: { "sessions.$": uuid },
        });

        console.warn({ response }, 'update sessionId');
        return { sessionId: uuid };
    },

    //delete
    async getUserBySessionId(sessionId: string, selectMask = {}): Promise<UserDB> {
        await connectDB();
        const person = await User.findOne({
            sessions: {
                $in: sessionId,
            },
        }, selectMask);

        return person.toObject();
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

    async randomGenerate(count = 10): Promise<void> {
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
            });
            const result = await person.save();
        }
    },

    async getAvailableProjects(userEmail: string): Promise<ProjectListAvailableRecord[]> {
        await connectDB();
        const user = await this.getUserByEmail(userEmail, { _id: 1 });

        const projects = await ProjectActions.getAvailableProjects(user._id);

        return projects;
    },
};

