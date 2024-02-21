import { UIPaper } from "@/ui/UIPaper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "@/utlis/capitalizeFirstLetter";
import { purple } from "@mui/material/colors";
dayjs.locale(uk);

const months = Array.from({ length: 12 });

type RevenueType = {
};

export const Revenue: React.FC<RevenueType> = ({ }) => {
    const currentDate = dayjs();
    const data = [0, 1000, 2000, 3000, 4000];
    return (
        <>
            <UIPaper title="Project revenue"
                titleSlot={'year'}
            >
                <Stack direction={'row'} spacing={3}>
                    <Typography variant="h4">37 hours</Typography>
                    <Typography variant="caption" sx={{ p: 1, color: 'warning.main', backgroundColor: 'warning.light' }} >Avg. 148h/month</Typography>
                </Stack>
                <Grid container columns={14}>
                    <Grid item xs={2}>
                        <Stack>
                            {data.reverse().map((item, index) => (
                                <Box key={index} p={2} sx={{ position: 'relative', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'transparent' }}>
                                    <Typography textAlign={'center'} component={'div'} variant="caption" position={'absolute'} sx={{ bottom: '-25%', }}>{item} $</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>
                    {
                        months.map((_, index) => (
                            <Grid key={index} item xs={1} alignItems={'center'} sx={{ position: 'relative' }}>
                                <Bar isLoverAvarage={index % 2 === 0} />
                                <Stack alignItems={'center'} justifyContent={'center'}>
                                    {data.reverse().map((item, index) => (
                                        <Box key={index} p={2} sx={{ borderBottomStyle: 'solid', borderBottomColor: '#ccc', borderBottomWidth: '1px', width: '100%', }}>
                                        </Box>
                                    ))}
                                </Stack>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container columns={14} pt={2}>
                    <Grid item xs={2}></Grid>
                    {
                        months.map((_, index) => (
                            <Grid key={index} item xs={1}>
                                <Typography variant="caption" component={'div'} textAlign={'center'}>
                                    {capitalizeFirstLetter(currentDate.month(index).format('MMM'))}
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
    isLoverAvarage: boolean
};

export const Bar: React.FC<BarType> = ({ isLoverAvarage }) => {

    return (
        <Box sx={{
            position: 'absolute',
            bottom: 0,
            top: '12%',
            backgroundColor: 'transparent',
            borderRadius: 4,
            width: '1em',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}>
            <Box sx={{
                backgroundColor: isLoverAvarage ? purple[400] : 'secondary.light',
                height: '80%',
                bottom: 0,
                borderRadius: 4,
            }} />

        </Box>
    );
};