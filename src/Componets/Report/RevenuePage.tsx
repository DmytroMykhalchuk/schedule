import Stack from '@mui/material/Stack';
import { FormRevenue } from './Elements/FormRevenue';
import { getUserSessionAndEmail } from '../actions';
import { ListRevenue } from '@/Componets/Report/Elements/ListRevenue';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';

type RevenuePageType = {
    page?: number;
    formAction: (formData: FormData) => void;
    locale: string;
    createdId?: string;
};

export const RevenuePage: React.FC<RevenuePageType> = async ({ page, formAction, locale, createdId }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <div>
                <FormRevenue formAction={formAction} authEmail={authEmail} locale={locale} createdId={createdId} />
            </div>
            <MiddlePaperWrapper>
                <div>
                    <ListRevenue page={page} locale={locale} />
                </div>
            </MiddlePaperWrapper>
        </Stack>
    );
};
