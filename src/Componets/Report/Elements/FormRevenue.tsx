import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { MonthCalendar } from '@/Componets/Report/MonthCalendar';
import { UIButton } from '@/Componets/UI/UIButton';
import { UIInputField } from '@/Componets/UI/UIInputField';
import { ReactNode } from 'react';
import { getUserSessionAndEmail } from '@/Componets/actions';

type FormRevenueType = {
    formAction: (formData: FormData) => void
    defaultValues?: {
        note: string,
        cost: number,
        date: Date,
    },
    children?: ReactNode
};

export const FormRevenue: React.FC<FormRevenueType> = async ({ defaultValues, formAction, children }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <MiddlePaperWrapper pathBack="/app/charts" title="Add record to revenue">
            <form action={formAction}>
                <input type="hidden" name="auth_email" value={authEmail} />
                {children}

                <Stack alignItems={'start'} spacing={2} mb={2}>
                    <UIInputField
                        label="Total"
                        name="cost"
                        inputAdorment={{ label: '$', position: 'start' }}
                        defaultValue={defaultValues?.cost}
                    />
                    <UIInputField
                        label="Note"
                        name="note"
                        required={false}
                        defaultValue={defaultValues?.note}
                    />
                    <MonthCalendar defaultValue={defaultValues?.date} />
                </Stack>
                <Stack alignItems={'center'}>
                    <UIButton label="Confirm" type="submit" />
                </Stack>
            </form>
            <Typography variant="caption">Saved value will be added to the current.</Typography>
        </MiddlePaperWrapper>
    );
};
