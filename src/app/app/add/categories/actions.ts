import { getAuthParams } from "@/app/Componnets/actions";
import { CategoryActions } from "@/server/actions/CategoryActions";
import { RedirectType, redirect } from "next/navigation";

export const createCategory = async (formData: FormData) => {
    'use server';

    const authParams = await getAuthParams();

    const categoryName = formData.get('category_name') as string;
    const color = formData.get('color') as string;

    const result = await CategoryActions.storeCategory(authParams, { categoryName, color });

    result && redirect('/app/add/categories/' + result);
};

export const updateCategory = async (formData: FormData) => {
    'use server';

    const authParams = await getAuthParams();

    const categoryName = formData.get('category_name') as string;
    const color = formData.get('color') as string;
    const categoryId = formData.get('category_id') as string;

    const result = await CategoryActions.updateCategory(authParams, { categoryName, color, categoryId });

    result?.success && redirect('/app/add/categories/');
};

export const getCategoryById = async (categoryId: string) => {
    const authParams = await getAuthParams();

    const category = CategoryActions.getCategory(authParams, categoryId);

    return category;
};

export const deleteCategory = async (formData: FormData) => {
    'use server';

    const authParams = await getAuthParams();
    const categoryId = formData.get('category_id') as string;

    const result = await CategoryActions.deleteCategory(authParams, categoryId);

    result?.success && redirect('/app/add/categories');
}