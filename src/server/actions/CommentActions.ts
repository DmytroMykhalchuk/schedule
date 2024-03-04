import Comment from '../models/Comment';
import connectDB from '../connectDB';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import { AuthType, CommentDB, CommentType, LatestCommentType, StoreCommentRequestType, StoreCommentType } from './types';
import { channelPrefixName, newCommentEventName, removedCommentEventName } from '../constants';
import { getRandomBoolean, getRandomInt, getRandomString } from '../utils/utils';
import { ObjectId } from 'mongodb';
import { ProjectActions } from './ProjectActions';
import { TaskActions } from './TaskActions';
import { UserActions } from './UserActions';

const pusher = new Pusher({
    appId: "1752490",
    key: "90149ab3e623050894c1",
    secret: "9a5bc84db603fc34ddaa",
    cluster: "eu",
    useTLS: true
});

export const CommentActions = {
    async storeComment(auth: AuthType, requestComment: StoreCommentRequestType) {
        await connectDB();

        const user = await UserActions.getUserByEmail(auth.email);
        const project = await ProjectActions.getProjectById(auth.projectId, { _id: 1 }, user._id);

        if (!project) {
            return;
        }

        const commentStore: StoreCommentType = {
            name: user.name,
            picture: user.picture,
            projectId: project._id,
            replyId: requestComment.replyId,
            taskId: requestComment.taskId,
            text: requestComment.commentText,
            userId: user._id,
            _id: new ObjectId(),
        };
        const comment = await this.createCommentOfTask(commentStore);

        await TaskActions.addCommentId(requestComment.taskId, comment._id);

        pusher.trigger(`${channelPrefixName}${project._id.toString()}`, newCommentEventName, {
            comment: comment
        });

        const responseComment: CommentType = {
            name: comment.name,
            picture: comment.picture,
            replyId: comment.replyId,
            text: comment.text,
            isOwner: true,
            _id: comment._id.toString(),
            userId: comment.userId.toString(),
            createdAt: comment.createdAt,
        };

        return responseComment;
    },

    async removeComment(auth: AuthType, commentId: string): Promise<{ success: boolean }> {
        await connectDB();

        const user = await UserActions.getUserByEmail(auth.email);

        const comment = await Comment.findByIdAndDelete({ _id: commentId, userId: user._id });

        let isDeleted = comment._id;

        pusher.trigger(`${channelPrefixName}${comment.projectId}`, removedCommentEventName, {
            commentId,
        });

        return { success: isDeleted };
    },

    async createCommentOfTask(storeComment: StoreCommentType): Promise<CommentDB> {
        await connectDB();
        const commentModel = new Comment({ ...storeComment });

        const comment = await commentModel.save();

        return comment;
    },

    async getCommentsByIds(commentIds: string[] | mongoose.Types.ObjectId[]): Promise<(CommentDB & { toObject: Function })[]> {
        await connectDB();

        const comments = await Comment.find({ _id: commentIds });

        return comments;
    },

    async getLastComments(auth: AuthType): Promise<LatestCommentType[]> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(auth, { _id: 1 });

        if (!project) {
            return [];
        }

        const comments = await Comment.find({ projectId: project._id }).populate('taskId', 'name').sort('-createdAt').limit(6);

        return comments as LatestCommentType[];
    },

    async generateComments(projectId: string, taskId: string, userIds: mongoose.Types.ObjectId[], maxCount = 10) {
        await connectDB();

        const randomCommentsCount = getRandomInt(1, maxCount);

        const users = await UserActions.getUsersByIds(userIds.map(item => item.toString()));
        const commentsIds = [] as mongoose.Types.ObjectId[];

        for (let index = 0; index < randomCommentsCount; index++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            const commentStore: StoreCommentType = {
                name: randomUser.name,
                picture: randomUser.picture,
                projectId: projectId,
                replyId: getRandomBoolean(0.4) ? commentsIds[Math.floor(Math.random() * commentsIds.length)]?.toString() || '' : '',
                taskId: taskId,
                text: getRandomString(3, 50),
                userId: randomUser._id.toString(),
                _id: new ObjectId(),
            };

            const comment = await this.createCommentOfTask(commentStore);

            commentsIds.push(comment._id);
        }
        return commentsIds;
    },

    async deleteGeneratedComments(projectId: string) {
        await connectDB();

        await Comment.deleteMany({ projectId });
    }
};