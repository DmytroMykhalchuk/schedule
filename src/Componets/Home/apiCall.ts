import axios from 'axios';
import { getCookieValue } from '@/utlis/getCookieValue';
import { projectIdCookieKey } from '@/server/constants';

export const makeSearch = async (text: string, email: string) => {
    const projectId = getCookieValue(projectIdCookieKey);

    return axios.get('/api/search', {
        params: { q: text },
        headers: {
            'x-project': projectId,
            'x-user': email,
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        console.error(error);
    });
};