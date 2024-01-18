'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Router } from "next/router";

export const logout = async () => {
    'use server';
    cookies().delete('auth_id');
    cookies().delete('auth');
    redirect('/auth');
};

export const onCheck = async () => {
    'use server';
    redirect('/app');
}