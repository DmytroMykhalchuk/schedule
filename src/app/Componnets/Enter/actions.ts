import { UserActions } from "@/server/actions/UserActions";
import { getCookie, setCookie } from 'cookies-next';
import { redirect } from "next/navigation";

export const getAvailbleProjects = async (authEmail: string) => {
    const projects = await UserActions.getAvailableProjects(authEmail);
    return projects;
};
