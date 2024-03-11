
import { getAvailbleProjects } from "./actions";
import Stack from '@mui/material/Stack';
import { ListProjets } from "./Elements/ListProjets";

type AvailbleProjectsType = {
    authEmail: string;
    locale: string;
};

export const AvailbleProjects: React.FC<AvailbleProjectsType> = async ({ authEmail, locale }) => {
    const projects = await getAvailbleProjects(authEmail as string);

    if (!projects.length) {
        return <></>
    }

    return (
        <Stack spacing={2}>
            <ListProjets projects={projects} locale={locale} />
        </Stack>
    );
};