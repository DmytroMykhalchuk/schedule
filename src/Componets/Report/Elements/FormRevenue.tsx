import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { MonthCalendar } from '@/Componets/Report/MonthCalendar';
import { UIButton } from '@/Componets/UI/UIButton';
import { UIInputField } from '@/Componets/UI/UIInputField';
import { ReactNode } from 'react';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { useTranslations } from 'next-intl';

type FormRevenueType = {
    formAction: (formData: FormData) => void
    defaultValues?: {
        note: string,
        cost: number,
        date: Date,
    },
    children?: ReactNode
    authEmail: string
};

export const FormRevenue: React.FC<FormRevenueType> = ({ defaultValues, formAction, children, authEmail }) => {
    const translation = useTranslations('Form');

    return (
        <MiddlePaperWrapper pathBack="/app/charts" title={translation('revenue.title')}>
            <form action={formAction}>
                <input type="hidden" name="auth_email" value={authEmail} />
                {children}

                <Stack alignItems={'start'} spacing={2} mb={2}>
                    <UIInputField
                        label={translation('revenue.total')}
                        name="cost"
                        inputAdorment={{ label: '$', position: 'start' }}
                        defaultValue={defaultValues?.cost}
                    />
                    <UIInputField
                        label={translation('revenue.note')}
                        name="note"
                        required={false}
                        defaultValue={defaultValues?.note}
                    />
                    <MonthCalendar defaultValue={defaultValues?.date} label={translation('revenue.date')} />
                </Stack>
                <Stack alignItems={'center'}>
                    <UIButton label={translation('confirm')} type="submit" />
                </Stack>
            </form>
        </MiddlePaperWrapper>
    );
};
