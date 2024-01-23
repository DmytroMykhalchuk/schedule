import connectDB from "../connectDB";
import User from "../models/User";
import uniqid from 'uniqid';

export type StoreUser = {
    name: string
    email: string
    google_id: string
};

export const UserActions = {
    async login(user: StoreUser) {
        await connectDB();
        const targetUser = await User.findOne({ google_id: user.google_id })
        // const targetUser = await User.findOne({ name:'dgd' });
        let uuid = uniqid();
        if (targetUser) {
            await User.findOneAndUpdate({ _id: targetUser._id }, { ...user, sessions: [...targetUser.sessions, uuid] }).exec()
            return { sessionId: uuid };
        } else {
            const person = new User({ ...user, sessions: [uuid] });
            const result = person.save();
            return { sessionId: uuid };
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
    }
};