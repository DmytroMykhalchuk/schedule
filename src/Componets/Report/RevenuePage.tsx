import Stack from '@mui/material/Stack';
import { FormRevenue } from './Elements/FormRevenue';
import { getUserSessionAndEmail } from '../actions';
import { ListRevenue } from '@/Componets/Report/Elements/ListRevenue';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';

type RevenuePageType = {
    page?: number,
    formAction: (formData: FormData) => void
};

export const RevenuePage: React.FC<RevenuePageType> = async ({ page, formAction }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <FormRevenue formAction={formAction} authEmail={authEmail}/>
            <MiddlePaperWrapper>
                <ListRevenue page={page} />
            </MiddlePaperWrapper>
        </Stack>
    );
};
