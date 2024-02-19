import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

type RecordActionsType = {
    editPath: string
    deletePath: string
};

export const RecordActions: React.FC<RecordActionsType> = ({ editPath, deletePath }) => {

    return (
        <Stack direction={'row'} spacing={2}>
            <Link href={editPath}>
                <EditIcon color='success' />
            </Link>
            {
                deletePath &&
                <Link href={deletePath}>
                    <DeleteIcon color="warning" />
                </Link>
            }
        </Stack>
    );
};