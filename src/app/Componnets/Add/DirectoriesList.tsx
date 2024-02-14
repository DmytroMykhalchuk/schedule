import { getDirectories } from "@/app/app/add/directory/actions";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography'
import { RecordActions } from "../Common/RecordActions";

type DirectoriesListType = {
};

export const DirectoriesList: React.FC<DirectoriesListType> = async ({ }) => {
    const directories = await getDirectories();

    return (
        <Stack spacing={2}>
            {
                directories.map(directory => (
                    <Stack direction={'row'} key={directory._id.toString()} alignItems={'center'}>
                        <Typography variant="h6" flex={1}>{directory.name}</Typography>
                        <RecordActions
                            deletePath={`${directory._id.toString()}/delete`}
                            editPath={directory._id.toString()}
                        />
                    </Stack>
                ))
            }
        </Stack>
    );
};