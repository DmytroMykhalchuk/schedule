import { ThemeSwither } from '@/Componets/Settings/ThemeSwither';
import Paper from '@mui/material/Paper';

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    return (
        <>
            <Paper>
                <ThemeSwither />
            </Paper>
        </>
    );
};

export default Page;