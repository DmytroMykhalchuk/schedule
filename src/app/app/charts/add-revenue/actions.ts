import { getAuthParams } from "@/app/Componnets/actions"
import { RevenueActions } from "@/server/actions/RevenueActions";
import { RevenueRecordPopulatedType } from "@/server/actions/types";
import { redirect } from "next/navigation";

export const getRevenue = async (page: number) => {
    const projectId = getCookieProjectId();

    const result = await RevenueActions.getLastRevenue(authParams, page);

    return result;
};

export const getRevenurById = async (id: string) => {
    const projectId = getCookieProjectId();
    const result = await RevenueActions.getRevenueById(authParams, id);

    result === null && redirect('/not-found')

    return result as RevenueRecordPopulatedType;
};

export const addRevenueRecord = async (formData: FormData) => {
    'use server';

    const projectId = getCookieProjectId();

    const cost = parseInt(formData.get('cost') as string);
    const date = formData.get('date') as string;
    const note = formData.get('note') as string;

    const result = await RevenueActions.addRevenue(authParams, { cost, date, note });
    if (result?.success) {
        redirect('/app/charts/add-revenue');
    }
};

export const updateRevenue = async (formData: FormData) => {
    'use server';

    const projectId = getCookieProjectId();

    const cost = parseInt(formData.get('cost') as string);
    const date = formData.get('date') as string;
    const note = formData.get('note') as string;
    const id = formData.get('revenue_id') as string;

    const result = await RevenueActions.updateRevenue(authParams, {
        cost, date, note, id,
    });

    if (result?.success) {
        redirect('/app/charts/add-revenue');
    }
};

export const deleteRevenue = async (formData: FormData) => {
    'use server';
    const projectId = getCookieProjectId();
    const id = formData.get('revenue_id') as string;

    const result = await RevenueActions.deleteRevenue(authParams, id);

    if (result?.success) {
        redirect('/app/charts/add-revenue');
    }

}