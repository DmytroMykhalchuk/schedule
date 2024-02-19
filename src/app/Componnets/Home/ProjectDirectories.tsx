import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AddDirectory } from './Elements/AddDirectory';
import { getDirectories } from './actions';
import { ProjectDirectoryItem } from './Elements/ProjectDirectoryItem';

type ProjectDirectoriesType = {
};

export const ProjectDirectories: React.FC<ProjectDirectoriesType> = async ({ }) => {
    const directories = await getDirectories();

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6">Project directory</Typography>
            {
                directories.map((item, index) => (
                    <ProjectDirectoryItem
                        key={index}
                        title={item.name}
                        users={[]}
                    />
                ))
            }
            <AddDirectory />
        </Paper>
    );
};