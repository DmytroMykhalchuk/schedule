import { getCookieProjectId } from "@/app/Componnets/actions";
import { CategoryActions } from "@/server/actions/CategoryActions";
import { RedirectType, redirect } from "next/navigation";

export const createCategory = async (formData: FormData) => {
    'use server';

    const projectId = getCookieProjectId();

    const categoryName = formData.get('category_name') as string;
    const color = formData.get('color') as string;
    const email = formData.get('auth_email') as string;

    const result = await CategoryActions.storeCategory({ projectId, email }, { categoryName, color });

    result && redirect('/app/add/categories/' + result);
};

export const updateCategory = async (formData: FormData) => {
    'use server';

    const projectId = getCookieProjectId();

    const categoryName = formData.get('category_name') as string;
    const color = formData.get('color') as string;
    const categoryId = formData.get('category_id') as string;
    const email = formData.get('auth_email') as string;

    const result = await CategoryActions.updateCategory({ projectId, email }, { categoryName, color, categoryId });

    result?.success && redirect('/app/add/categories/');
};

export const getCategoryById = async (categoryId: string, email: string) => {
    const projectId = getCookieProjectId();

    const category = CategoryActions.getCategory({ projectId, email }, categoryId);

    return category;
};

export const deleteCategory = async (formData: FormData) => {
    'use server';

    const projectId = getCookieProjectId();
    const categoryId = formData.get('category_id') as string;
    const email = formData.get('auth_email') as string;

    const result = await CategoryActions.deleteCategory({ projectId, email }, categoryId);

    result?.success && redirect('/app/add/categories');
}