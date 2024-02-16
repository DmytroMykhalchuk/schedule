import connectDB from '../connectDB';
import { AuthType, ProccessStatusType, CategoryRecord, CategoryDB } from './types';
import { getContrastColor } from '@/utlis/getContrastColor';
import { ObjectId } from 'mongodb';
import { ProjectActions } from './ProjectActions';

export type StoreCategory = {
    color: string,
    categoryName: string,
};

export type UpdateCategory = StoreCategory & { categoryId: string };

export const CategoryActions = {
    async storeCategory(authParams: AuthType, storeCategory: StoreCategory): Promise<string> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { categories: 1 });

        if (!project) {
            return '';
        }

        const textColor = getContrastColor(storeCategory.color);
        const newCategory = {
            _id: new ObjectId(),
            name: storeCategory.categoryName,
            color: storeCategory.color,
            textColor,
        };

        project.categories.push(newCategory);
        project.save();

        return newCategory._id.toString();
    },

    async getCategories(authParams: AuthType): Promise<CategoryRecord[]> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { categories: 1 });

        const categories = project?.categories.map((category: CategoryDB): CategoryRecord => ({
            _id: category._id.toString(),
            name: category.name,
            color: category.color,
            textColor: category.textColor,
        })) || [];

        return categories;
    },

    async getCategory(authParams: AuthType, categoryid: string): Promise<CategoryRecord | null> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { categories: 1 });

        const category = project?.categories.find((cateory: CategoryDB) => cateory._id.toString() === categoryid);

        return category;
    },

    async updateCategory(authParams: AuthType, updateCategory: UpdateCategory): Promise<ProccessStatusType> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams, { categories: 1 });

        if (!project) {
            return { success: false };
        }

        project.categories = project.categories.map((category: CategoryDB) => {
            if (category._id.toString() === updateCategory.categoryId) {
                const textColor = getContrastColor(updateCategory.color);
                return {
                    ...category,
                    name: updateCategory.categoryName,
                    color: updateCategory.color,
                    textColor,
                };
            }
            return category;
        })

        project.save();

        return { success: true };
    },

    async deleteCategory(authParams: AuthType, categoryId: string): Promise<ProccessStatusType> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams, { categories: 1 });

        project.categories = project?.categories.filter((category: CategoryDB) => category._id.toString() !== categoryId);

        project?.save();

        return { success: Boolean(project) };
    },

};