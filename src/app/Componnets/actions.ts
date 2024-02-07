import { UserActions } from '@/server/actions/UserActions';
import { authCookieKey, projectIdCookieKey, sessionLifeTimeInHours } from "@/server/constants";
import dayjs from "dayjs";
import { cookies } from "next/headers";

type AuthDataType = {
    sessionId?: string,
    lastUpdatedAt?: number,
};

export const getAuthParams = async () => {
    const projectId = cookies().get(projectIdCookieKey)?.value || '';
    const authDataJson = cookies().get(authCookieKey)?.value || '';
    const authData = JSON.parse(authDataJson || '{}') as AuthDataType;

    if (!authData.sessionId) {
        return { projectId: '', sessionId: '' };
    }

    const dateMark = dayjs((authData?.lastUpdatedAt || 0) * 1000);
    const diffInSeconds = dateMark.diff(dayjs().add(1, 'day')) / 1000;
    const diffInHours = Math.abs(diffInSeconds / 60 / 60);

    let sessionId = '';
    if (sessionLifeTimeInHours < diffInHours) {
        const response = await UserActions.updateSessionId(authData.sessionId);
        if (!response.sessionId) {
            return { projectId: '', sessionId: '' };
        }
        cookies().set(authCookieKey, JSON.stringify({
            sessionId: response.sessionId,
            lastUpdatedAt: dayjs().unix(),
        }));
        sessionId = response.sessionId;
    } else {
        sessionId = authData.sessionId;
    }

    return {
        projectId, sessionId,
    };
};