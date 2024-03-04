import { ThemeSwither } from '@/Componets/Settings/ThemeSwither';
import Paper from '@mui/material/Paper';
import { useTranslations } from 'next-intl';

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    const translation = useTranslations("Settings");

    return (
        <Paper>
            <ThemeSwither dictionary={{
                mode: {
                    light: translation('light_mode'),
                    dark: translation('dark_mode'),
                },
            }} />
        </Paper>
    );
};

export default Page;