import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type AddDirectoryType = {
    locale: string
};

export const AddDirectory: React.FC<AddDirectoryType> = ({ locale }) => {
    const translation = useTranslations('Form');
    
    return (
        <Link href={`/${locale}/app/add/directories`}>
            <Button variant="outlined"
                startIcon={<AddIcon />}
                color='warning'
                size='small'
                sx={{
                    borderRadius: 4,
                    textTransform: 'none',
                }}
            >
                {translation('add_more')}
            </Button>
        </Link>
    );
};