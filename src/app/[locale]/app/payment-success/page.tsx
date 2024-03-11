import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { checkPayment } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { useTranslations } from 'next-intl';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const result = await checkPayment();

    return (
        <Stack alignItems={'center'} justifyContent={'center'}>
            <MiddlePaperWrapper>
                <div>
                    <Content isActive={result.isActive} />
                </div>
            </MiddlePaperWrapper>
        </Stack>
    );
};

type ContetnType = {
    isActive: boolean;
};

const Content: React.FC<ContetnType> = ({ isActive }) => {
    const translation = useTranslations('Premium');

    return (
        <Stack alignItems={'center'}>
            <Typography variant="h5">{translation(isActive ? 'title_success' : 'title_unsuccess')}</Typography>
            <Typography variant="subtitle2">{translation(isActive ? 'subtitle_success' : 'subtitle_unsuccess')}</Typography>
        </Stack>
    );
};

export default Page;