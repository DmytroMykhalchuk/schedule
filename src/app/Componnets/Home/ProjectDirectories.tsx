import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProjectDirectoryItem } from "./Elements/ProjectDirectoryItem";
import { AddDirectory } from "./Elements/AddDirectory";

type ProjectDirectoriesType = {
};

export const ProjectDirectories: React.FC<ProjectDirectoriesType> = ({ }) => {

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6">Project directory</Typography>
            <ProjectDirectoryItem
                title="Project ttile"
                users={[
                    {
                        name: 'Volodymyr',
                        image: `https://random-d.uk/api/v2/randomimg`,
                    },
                    {
                        name: 'Oleg',
                        image: `https://random-d.uk/api/v2/randomimg`,
                    }
                ]}
            />
            <AddDirectory />
        </Paper>
    );
};