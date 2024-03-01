import { getCookieProjectId } from "@/Componets/actions"
import { PageActions } from "@/server/actions/PageActions";

export const getPageInfo = async (email: string) => {
    const projectId = getCookieProjectId();

    const response = await PageActions.getChartsInfo({ projectId, email });

    return response;
};