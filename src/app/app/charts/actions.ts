import { getAuthParams } from "@/app/Componnets/actions"
import { PageActions } from "@/server/actions/PageActions";

export const getPageInfo = async () => {
    const authParams = await getAuthParams();

    const response = await PageActions.getChartsInfo(authParams);

    return response;
};