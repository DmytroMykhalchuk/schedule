import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { MonthCalendar } from '@/app/Componnets/Report/MonthCalendar';
import { UIButton } from '@/app/Componnets/UI/UIButton';
import { UIInputField } from '@/app/Componnets/UI/UIInputField';
import { ReactNode } from 'react';

type FormRevenueType = {
    formAction: (formData: FormData) => void
    defaultValues?: {
        note: string,
        cost: number,
        date: Date,
    },
    children?: ReactNode
};

export const FormRevenue: React.FC<FormRevenueType> = ({ defaultValues, formAction, children }) => {

    return (
        <MiddlePaperWrapper pathBack="/app/charts" title="Add record to revenue">
            <form action={formAction}>
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
