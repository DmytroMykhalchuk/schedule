import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography'
import { RecordActions } from "../Common/RecordActions";
import { DirectoryWithUsersType } from "@/server/actions/types";

type DirectoriesListType = {
    directories: DirectoryWithUsersType[]
};

export const DirectoriesList: React.FC<DirectoriesListType> = async ({ directories }) => {

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