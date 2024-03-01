
import { getAvailbleProjects } from "./actions";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import styles from './styles.module.scss';
import { ListProjets } from "./Elements/ListProjets";

type AvailbleProjectsType = {
    authEmail: string
};

export const AvailbleProjects: React.FC<AvailbleProjectsType> = async ({ authEmail }) => {
    const projects = await getAvailbleProjects(authEmail as string);

    if (!projects.length) {
        return <></>
    }

    return (
        <Stack spacing={2}>
            <ListProjets projects={projects} />
        </Stack>
    );
};