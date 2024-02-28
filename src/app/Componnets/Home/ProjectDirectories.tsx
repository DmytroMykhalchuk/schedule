import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AddDirectory } from './Elements/AddDirectory';
import { getDirectories } from './actions';
import { ProjectDirectoryItem } from './Elements/ProjectDirectoryItem';

type ProjectDirectoriesType = {
    authEmail: string
};

export const ProjectDirectories: React.FC<ProjectDirectoriesType> = async ({ authEmail }) => {
    const directories = await getDirectories(authEmail);

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6">Project directory</Typography>
            {
                directories.map((item, index) => (
                    <ProjectDirectoryItem
                        key={index}
                        title={item.name}
                        users={item.users}
                        id={item._id.toString()}
                    />
                ))
            }
            <AddDirectory />
        </Paper>
    );
};