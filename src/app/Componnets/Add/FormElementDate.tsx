'use client'
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import ShareIcon from '@mui/icons-material/Share';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import uk from 'dayjs/locale/uk';
import 'dayjs/locale/uk';
dayjs.locale(uk)

type FormElementDateType = {
    defaultDueDate?: string
};

export const FormElementDate: React.FC<FormElementDateType> = ({ defaultDueDate }) => {

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3} justifyContent={'center'}>
                <Stack justifyContent={'center'} height={'100%'}>
                    <Typography variant="body1" color={'gray'}>Due date</Typography>
                </Stack>
            </Grid>
            <Grid item xs={9}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk" >
                    <MobileDatePicker defaultValue={defaultDueDate ? dayjs(defaultDueDate) : dayjs()} name="due_date"
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>
    );
};