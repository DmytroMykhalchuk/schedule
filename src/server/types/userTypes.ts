export type UserRecord = {
    googleId: string,
    name: string,
    picture: string,
    email: string
    _id: string,
};

export type UserLoginResponse = {
    name: string,
    image: string,
    email: string
    id: string,
};