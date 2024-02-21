import { UIPaper } from "@/ui/UIPaper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "@/utlis/capitalizeFirstLetter";
dayjs.locale(uk);

const workHours = [0, 2, 4, 6, 8];

type TotalWorkingHoursType = {
};

export const TotalWorkingHours: React.FC<TotalWorkingHoursType> = ({ }) => {
    const currentDate = dayjs();
    const data = [3, 4, 6, 7, 2];
    return (
        <>
            <UIPaper title="Total working hours"
                titleSlot={'year'}
            >
                <Stack direction={'row'} spacing={3}>
                    <Typography variant="h4">37 hours</Typography>
                    <Typography variant="caption" sx={{ p: 1, color: 'warning.main', backgroundColor: 'warning.light' }} >Avg. 148h/month</Typography>
                </Stack>
                <Grid container columns={11}>
                    <Grid item xs={1}>
                        <Stack>
                            {workHours.reverse().map((item, index) => (
                                <Box key={index} p={2} sx={{ position: 'relative', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'transparent' }}>
                                    <Typography textAlign={'center'} component={'div'} variant="caption" position={'absolute'} sx={{ bottom: '-25%', }}>{item} h</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>
                    {
                        data.map((_, index) => (
                            <Grid key={index} item xs={2} alignItems={'center'} sx={{ position: 'relative' }}>
                                <Bar />
                                <Stack alignItems={'center'} justifyContent={'center'}>
                                    {workHours.reverse().map((item, index) => (
                                        <Box key={index} p={2} sx={{ borderBottomStyle: 'solid', borderBottomColor: '#ccc', borderBottomWidth: '1px', width: '100%', }}>
                                        </Box>
                                    ))}
                                </Stack>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container columns={11} pt={2}>
                    <Grid item xs={1}></Grid>
                    {
                        data.map((_, index) => (
                            <Grid key={index} item xs={2}>
                                <Typography variant="caption" component={'div'} textAlign={'center'}>
                                    {capitalizeFirstLetter(currentDate.day(index + 1).format('dd'))}
                                </Typography>
                            </Grid>
                        ))
                    }
                </Grid>
            </UIPaper>
        </>
    );
};

type BarType = {
};

export const Bar: React.FC<BarType> = ({ }) => {

    return (
        <Box sx={{
            position:'absolute',
            bottom:0,
            top:'12%',
            backgroundColor:'peachy.main',
            borderRadius:4,
            width:'1em',
            left:'50%',
            transform:'translateX(-50%)',
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-end',
        }}>
            <Box sx={{
                backgroundColor:'warning.main',
                height:'80%',
                bottom:0,
                borderRadius:4,
            }}/>

        </Box>
    );
};