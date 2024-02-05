import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
type AddDirectoryType = {
};

export const AddDirectory: React.FC<AddDirectoryType> = ({ }) => {

    return (
        <Button variant="outlined"
            href='/app/add/directory'
            startIcon={<AddIcon />}
            color='warning'
            size='small'
            sx={{
                borderRadius: 4,
                textTransform: 'none',
            }}
        >
            Add more
        </Button>
    );
};