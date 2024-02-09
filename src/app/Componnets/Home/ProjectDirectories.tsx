import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ProjectDirectoryItem } from "./Elements/ProjectDirectoryItem";
import { AddDirectory } from "./Elements/AddDirectory";
import { ProjectActions } from "@/server/actions/ProjectActions";
import { cookies } from "next/headers";
import { projectIdCookieKey } from "@/server/constants";

type ProjectDirectoriesType = {
};

export const ProjectDirectories: React.FC<ProjectDirectoriesType> = async ({ }) => {

    const geetDirectories = async () => {
        const targetProjectId = cookies().get(projectIdCookieKey)?.value || '';
        const directories = await ProjectActions.getDirectories(targetProjectId)

        return directories;
    };

    const directories = await geetDirectories();

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6">Project directory</Typography>
            {
                directories.map((item, index) => (
                    <ProjectDirectoryItem
                        key={index}
                        title={item}
                        users={[]}
                    />
                ))
            }
            <AddDirectory />
        </Paper>
    );
};