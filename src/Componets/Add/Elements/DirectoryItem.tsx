import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type DirectoryItemType = {
};

export const DirectoryItem: React.FC<DirectoryItemType> = ({ }) => {

    return (
        <>
            <Stack direction={'row'} key={directory._id.toString()} alignItems={'center'}>
                        <Typography variant="h6" flex={1}>{directory.name}</Typography>
                        <RecordActions
                            deletePath={`${directory._id.toString()}/delete`}
                            editPath={directory._id.toString()}
                        />
                    </Stack>
        </>
    );
};