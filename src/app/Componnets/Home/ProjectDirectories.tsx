import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ProjectDirectoryItem } from "./Elements/ProjectDirectoryItem";
import { AddDirectory } from "./Elements/AddDirectory";
import { ProjectActions } from "@/server/actions/ProjectActions";
import { cookies } from "next/headers";

type ProjectDirectoriesType = {
};

export const ProjectDirectories: React.FC<ProjectDirectoriesType> = async ({ }) => {

    const geetDirectories = async () => {
        const targetProjectId = cookies().get('target_project')?.value || '';
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
            {/* <ProjectDirectoryItem
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
            /> */}
            <AddDirectory />
        </Paper>
    );
};