import Paper from '@mui/material/Paper';
import { AddDirectory } from './Elements/AddDirectory';
import { getDirectories } from './actions';
import { PaperTitle } from '../Common/PaperTitle';
import { ProjectDirectoryItem } from './Elements/ProjectDirectoryItem';

type ProjectDirectoriesType = {
    authEmail: string,
    locale: string
};

export const ProjectDirectories: React.FC<ProjectDirectoriesType> = async ({ authEmail, locale }) => {
    const directories = await getDirectories(authEmail);

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <PaperTitle pageName={'AppHome'} titleKey='project_directories' />
            {
                directories.map((item, index) => (
                    <ProjectDirectoryItem
                        key={index}
                        title={item.name}
                        users={item.users}
                        id={item._id.toString()}
                        locale={locale}
                    />
                ))
            }
            <AddDirectory locale={locale} />
        </Paper>
    );
};