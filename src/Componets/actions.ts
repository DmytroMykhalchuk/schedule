import { addMember } from './../app/add/team/actions';
import { nextAuthConfig } from "@/configs/auth";
import { projectIdCookieKey } from "@/server/constants";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export const getCookieProjectId = () => {
    const projectId = cookies().get(projectIdCookieKey)?.value || '';
    return projectId;
};

export const getUserSessionAndEmail = async () => {
    const session = await getServerSession(nextAuthConfig);
    const authEmail = session?.user?.email as string;

    return { session, authEmail };
}