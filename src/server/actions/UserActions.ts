import { getMaxListeners } from "events";
import connectDB from "../connectDB";
import User from "../models/User";
//@ts-ignore
import uniqid from 'uniqid';
import { getRandomNumber, getRandomPictureUrl } from "../utils/utils";

export type StoreUser = {
    name: string
    email: string
    google_id: string
    picture: string
};
export type UserDB = {
    sessions: string[],
    google_id: number,
    name: string,
    picture: string,
    _id: string,
}

export const UserActions = {
    async login(user: StoreUser) {
        await connectDB();
        const targetUser = await User.findOne({ google_id: user.google_id })
        // const targetUser = await User.findOne({ name:'dgd' });
        let uuid = uniqid();
        if (targetUser) {
            await User.findOneAndUpdate({ _id: targetUser._id }, { ...user, sessions: [...targetUser.sessions, uuid] }).exec()
            return {
                code: 200,
                status: 'success',
                message: 'Success',
                data: {
                    sessionId: uuid,
                },
            };
        } else {
            const person = new User({ ...user, sessions: [uuid] });
            const result = await person.save();
            return {
                code: 201,
                status: 'success',
                message: 'Successfully created',
                data: {
                    sessionId: uuid,
                },
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

    async getUserBySessionId(sessionId: string): Promise<UserDB> {
        await connectDB();
        const person = await User.findOne({
            sessions: {
                $in: [sessionId],
            },
        });
        return person;
    },

    async getUsersByIds(ids: string[], mask = {} as any): Promise<UserDB[]> {
        await connectDB();
        const users = await User.find({ _id: { $in: ids } }, mask);

        return users;
    },
    async randomGenerate(count = 10): Promise<void> {
        await connectDB();

        const mailMask = 'example.user';
        const mailSufix = '@getMaxListeners.com';
        const nameMask = 'example.user';

        for (let index = 0; index < count; index++) {
            const person = new User({
                name: nameMask + getRandomNumber(),
                email: mailMask + getRandomNumber() + mailSufix,
                google_id: getRandomNumber(12),
                picture: getRandomPictureUrl(),
                sessions: [],
            });
            const result = await person.save();
        }
    },
};

