import { authCookieKey, projectIdCookieKey } from "@/server/constants";
import { getCookieValue } from "@/utlis/getCookieValue";
import axios from "axios";

export const sendComment = async (taskId: string, comment: string, replyToCommentId: string) => {
    const projectId = getCookieValue(projectIdCookieKey);
    const sessionId = getCookieValue(authCookieKey);

    return axios.post('/api/comments', {
        project_id: projectId,
        session_id: sessionId,
        comment,
        reply_id: replyToCommentId,
        task_id: taskId,
    }).then(response => {
        return response.data;
    }).catch(err => {
        console.log(err)
    });
};

export const deleteComment = async (taskId: string, commentId: string) => {
    const projectId = getCookieValue(projectIdCookieKey);
    const sessionId = getCookieValue(authCookieKey);

    return axios.delete('/api/comments', {
        params: {
            comment_id: commentId,
            task_id: taskId,
            project_id: projectId,
            session_id: sessionId,
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return { code: 500, error };
    });
}