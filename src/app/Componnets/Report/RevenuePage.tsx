import Stack from '@mui/material/Stack';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { ListRevenue } from '@/app/Componnets/Report/Elements/ListRevenue';
import { deleteRevenue } from '@/app/app/charts/add-revenue/actions';
import { FormRevenue } from './Elements/FormRevenue';

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
