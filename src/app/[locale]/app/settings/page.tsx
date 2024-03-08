import { Premium } from '@/Componets/Settings/Premium';
import { ThemeSwither } from '@/Componets/Settings/ThemeSwither';
import { getUserSessionAndEmail } from '@/Componets/actions';
import Paper from '@mui/material/Paper';
import { useTranslations } from 'next-intl';
import { getHasPremium } from './actions';

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
            <div>
                <Content />
            </div>
        </Paper>
    );
};

type ContentType = {
};

export const Content: React.FC<ContentType> = async ({ }) => {
    const { authEmail } = await getUserSessionAndEmail();
    const info = await getHasPremium(authEmail);
    return (
        <Premium isActive={info.hasPremium} />
    );
};

export default Page;