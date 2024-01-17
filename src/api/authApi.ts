import axios from "axios";

const googleUserEndpoint = 'https://www.googleapis.com/oauth2/v3/userinfo';

export const authApi = {
    getGoogleUser(accessToken: string) {
        return axios.get(googleUserEndpoint,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => response.data);
    },
}