import mongoose from "mongoose";
import connectDB from "../connectDB";
import Project from "../models/Project";
import { ProjectActions } from "./ProjectActions";
import { UserActions } from "./UserActions";
import { ObjectId } from "mongodb";

export type CommentType = {
    _id: string,
    userId: string
    name: string,
    picture: string,
    text: string
    isOwner: boolean
    replyId: string
};
export type CommentDB = Omit<CommentType, 'isOwner' | '_id'> & { _id: mongoose.Types.ObjectId };

export const CommentActions = {
    async storeComment(auth: { projectId: string, sessionId: string }, requestComment: { taskId: string, commentText: string, replyId: string }) {
        await connectDB();

        const user = await UserActions.getUserBySessionId(auth.sessionId);
        const project = await ProjectActions.getProjectByFilters(auth, { tasks: 1 });

        let createComment = null as null | CommentDB;

        project.tasks = project.tasks.map((task: { _id: string, comments: CommentDB[] }) => {
            if (task._id.toString() === requestComment.taskId) {
                console.log(task._id.toString(), requestComment.taskId)
                const comment: CommentDB = {
                    _id: new ObjectId(),
                    name: user.name,
                    picture: user.picture,
                    text: requestComment.commentText,
                    userId: user._id,
                    replyId: requestComment.replyId,
                };
                task.comments.push(comment);
                createComment = comment;
            };
            return task;
        });

        if (!createComment) {
            return 'Not found task or project';
        }

        project.save();

        const responseComment: CommentType = { ...createComment, isOwner: true, _id: createComment._id.toString() };

        return responseComment;
    },

    async removeComment(auth: { projectId: string, sessionId: string }, taskId: string, commentId: string): Promise<{ success: boolean }> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(auth.sessionId);
        const project = await ProjectActions.getProjectByFilters(auth, { tasks: 1 });

        let isDeleted = false;
        project.tasks = project.tasks.map((task: { _id: mongoose.Types.ObjectId, comments: CommentDB[] }) => {
            if (task._id.toString() === taskId) {
                console.log(task.comments)
                task.comments = task.comments.filter(comment => {
                    if (
                        comment._id.toString() === commentId && comment.userId === user._id.toString()
                    ) {
                        isDeleted = true;
                        return false;
                    }
                    return true;
                })
            }
            return task;
        });

        project.save();

        return { success: isDeleted };
    }
};