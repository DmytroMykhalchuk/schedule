import { UserActions } from "@/server/actions/UserActions";

export const getAvailbleProjects = async (authEmail: string) => {
    const projects = await UserActions.getAvailableProjects(authEmail);
    return projects;
};
