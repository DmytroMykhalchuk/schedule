import { projectIdCookieKey } from "@/server/constants";
import { getCookieValue } from "@/utlis/getCookieValue";
import axios from "axios";

export const sendComment = async (taskId: string, comment: string, replyToCommentId: string, email: string,) => {
    const projectId = getCookieValue(projectIdCookieKey);

    return axios.post('/api/comments', {
        project_id: projectId,
        email,
        comment,
        reply_id: replyToCommentId,
        task_id: taskId,
    }).then(response => {
        return response.data;
    }).catch(err => {
        console.error(err)
    });
};

export const deleteComment = async (commentId: string, email: string) => {
    const projectId = getCookieValue(projectIdCookieKey);

    return axios.delete('/api/comments', {
        params: {
            comment_id: commentId,
            project_id: projectId,
            email,
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return { code: 500, error };
    });
}