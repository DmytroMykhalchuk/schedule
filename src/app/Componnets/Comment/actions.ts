import { authCookieKey, projectIdCookieKey } from "@/server/constants";
import { getCookieValue } from "@/utlis/getCookieValue";
import axios from "axios";

export const sendComment = async (taskId: string, comment: string, replyToCommentId: string) => {
    const projectId = getCookieValue(projectIdCookieKey);
    const sessionJson = getCookieValue(authCookieKey) || '';
    const session = JSON.parse(decodeURIComponent(sessionJson) || '{}');
    const sessionId = session?.sessionId || '';

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

export const deleteComment = async (commentId: string) => {
    const projectId = getCookieValue(projectIdCookieKey);
    const sessionJson = getCookieValue(authCookieKey) || '';
    const session = JSON.parse(decodeURIComponent(sessionJson) || '{}');
    const sessionId = session?.sessionId || '';

    return axios.delete('/api/comments', {
        params: {
            comment_id: commentId,
            project_id: projectId,
            session_id: sessionId,
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return { code: 500, error };
    });
}