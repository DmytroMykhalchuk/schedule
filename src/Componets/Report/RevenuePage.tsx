import Stack from '@mui/material/Stack';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { ListRevenue } from '@/Componets/Report/Elements/ListRevenue';
import { FormRevenue } from './Elements/FormRevenue';
import { addRevenueRecord, deleteRevenue } from '@/app/[locale]/app/charts/add-revenue/actions';
import { getUserSessionAndEmail } from '../actions';

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
