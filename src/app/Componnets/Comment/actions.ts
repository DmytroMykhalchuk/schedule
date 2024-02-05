import { getCookieValue } from "@/utlis/getCookieValue";
import axios from "axios";

export const sendComment = async (taskId: string, comment: string, replyToCommentId: string) => {
    const projectId = getCookieValue('target_project');
    const sessionId = getCookieValue('auth_id');

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
}