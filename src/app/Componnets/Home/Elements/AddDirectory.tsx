import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
type AddDirectoryType = {
};

export const AddDirectory: React.FC<AddDirectoryType> = ({ }) => {

    return (
        <>
            <Button variant="outlined"
                startIcon={<AddIcon />}
                size='small'
                sx={{
                    borderRadius: 4,
                    textTransform: 'none',
                }}
            >
                Add more
            </Button>
        </>
    );
};