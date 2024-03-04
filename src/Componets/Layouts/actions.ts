'use server';
import { UserActions } from "@/server/actions/UserActions";
import { authCookieKey } from "@/server/constants";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
    'use server';
    // cookies().delete(authCookieKey);
    // cookies().delete('auth');

    await signOut();
    redirect('/auth');

};

export const onCheck = async () => {
    'use server';
    redirect('/app');
}