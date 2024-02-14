import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
type AddDirectoryType = {
};

export const AddDirectory: React.FC<AddDirectoryType> = ({ }) => {

    return (
        <Link href={'/app/add/directory'}>
            <Button variant="outlined"
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
        </Link>
    );
};