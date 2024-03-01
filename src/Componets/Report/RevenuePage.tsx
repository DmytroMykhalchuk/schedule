import Stack from '@mui/material/Stack';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { ListRevenue } from '@/Componets/Report/Elements/ListRevenue';
import { FormRevenue } from './Elements/FormRevenue';
import { deleteRevenue } from '@/app/[locale]/app/charts/add-revenue/actions';

type RevenuePageType = {
    page?: number,
};

export const RevenuePage: React.FC<RevenuePageType> = ({ page }) => {

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <FormRevenue formAction={deleteRevenue} />
            <MiddlePaperWrapper>
                <ListRevenue page={page} />
            </MiddlePaperWrapper>
        </Stack>
    );
};
