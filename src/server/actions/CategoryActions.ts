import connectDB from '../connectDB';
import Task from '../models/Task';
import { AuthType, CategoryDB, CategoryRecord, ProccessStatusType } from './types';
import { categoryColors } from '../constants';
import { getContrastColor } from '@/utlis/getContrastColor';
import { getRandomString } from '../utils/utils';
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

        await Task.updateMany({ categoryId: categoryId }, { categoryId: '' });

        return { success: Boolean(project) };
    },

    async generateCategories(projectId: string, count = 5) {
        await connectDB();
        const project = await ProjectActions.getProjectById(projectId);

        if (!project) {
            return '';
        };

        const categories = [] as CategoryDB[];

        for (let index = 0; index < count; index++) {
            const randomColor = categoryColors[Math.floor(Math.random() * categoryColors.length)];
            const textColor = getContrastColor(randomColor);
            categories.push({
                _id: new ObjectId(),
                name: getRandomString(3, 10),
                color: randomColor,
                textColor,
            });

        };

        project.categories = [...project.categories, ...categories];
        project.save();

        const categoryIds = project.categories.map((item: CategoryDB) => item._id);
        return categoryIds;
    },

};
