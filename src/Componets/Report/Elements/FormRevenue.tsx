import Stack from '@mui/material/Stack';
import { ControlRevenueForm } from './ControlRevenueForm';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { ReactNode } from 'react';
import { UIButton } from '@/Componets/UI/UIButton';
import { useTranslations } from 'next-intl';

type FormRevenueType = {
    formAction: (formData: FormData) => void;
    defaultValues?: {
        note: string;
        cost: number;
        date: Date;
    };
    children?: ReactNode;
    authEmail: string;
    locale: string;
    createdId?: string;
};

export const FormRevenue: React.FC<FormRevenueType> = ({ defaultValues, formAction, children, authEmail, locale, createdId }) => {
    const translation = useTranslations('Form');

    return (
        <MiddlePaperWrapper pathBack="/app/charts" title={translation('revenue.title')}>
            <form action={formAction}>
                <input type="hidden" name="auth_email" value={authEmail} />
                {children}

                <Stack alignItems={'start'} spacing={2} mb={2}>
                    <ControlRevenueForm
                        defaultValues={defaultValues}
                        dictionary={{
                            date: translation('revenue.date'),
                            note: translation('revenue.note'),
                            total: translation('revenue.total'),
                        }}
                        locale={locale}
                        createdId={createdId}
                    />
                </Stack>
                <Stack alignItems={'center'}>
                    <UIButton label={translation('confirm')} type="submit" />
                </Stack>
            </form>
        </MiddlePaperWrapper>
    );
};
