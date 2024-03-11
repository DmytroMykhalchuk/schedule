import { getCookieProjectId } from "@/Componets/actions"
import { ProjectActions } from "@/server/actions/ProjectActions";

export const checkPayment = async () => {
    const projectId = getCookieProjectId();

    const result = await ProjectActions.checkPayment(projectId);

    return result;
};