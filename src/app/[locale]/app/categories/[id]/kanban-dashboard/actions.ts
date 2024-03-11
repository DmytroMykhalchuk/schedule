import { getCookieProjectId } from "@/Componets/actions";
import { CategoryActions } from "@/server/actions/CategoryActions";

export const getCategoryAndTasks = async (categoryId: string, email: string) => {
    const projectId = getCookieProjectId();

    const result = await CategoryActions.getCategoryAndTasks({ projectId, email }, categoryId);

    return result;
};