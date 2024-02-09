'use server';
import { UserActions } from "@/server/actions/UserActions";
import { authCookieKey } from "@/server/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Router } from "next/router";

export const logout = async () => {
    'use server';
    await UserActions.logout(cookies().get(authCookieKey)?.value || '')
    cookies().delete(authCookieKey);
    cookies().delete('auth');
    redirect('/auth');
};

export const onCheck = async () => {
    'use server';
    redirect('/app');
}