import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { capitalizeFirstLetter } from '@/utlis/capitalizeFirstLetter';
import { WorkHours } from '@/server/actions/types';
import { weekLength, yearMonthLength } from '@/server/constants';
dayjs.locale(uk);

type WorkHoursChartType = {
    workinkgHours: WorkHours,
    length: typeof weekLength | typeof yearMonthLength,
    subtitles: string[],
    axisHours: number[];
    translate: {
        hoursLetter: string;
    };
};

export const WorkHoursChart: React.FC<WorkHoursChartType> = ({ workinkgHours, length, subtitles, axisHours, translate }) => {
    const axiosY = axisHours.sort((a, b) => b - a);
    const columnInfo = length === weekLength ? {
        totalColumn: 11, firstColumn: 1, barColumn: 2,
    } : {
        totalColumn: 13, firstColumn: 1, barColumn: 1,
    };

    const renderBar = (index: number): JSX.Element => {
        return (
            <Bar
                duration={workinkgHours?.hasOwnProperty(index) ? workinkgHours[index] : 0}
                maxValue={axiosY[0]}
            />
        );
    };

    return (
        <>
            <Grid container columns={columnInfo.totalColumn}>
                <Grid item xs={columnInfo.firstColumn}>
                    <Stack>
                        {axiosY.map((item, index) => (
                            <Box key={index} p={2} sx={{ position: 'relative', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'transparent' }}>
                                <Typography textAlign={'center'} component={'div'} variant="caption" position={'absolute'} sx={{ bottom: '-25%', }}>{item} {translate.hoursLetter}</Typography>
                            </Box>
                        ))}
                    </Stack>
                </Grid>
                {
                    Array.from({ length }).map((_, index) => (
                        <Grid key={index} item xs={columnInfo.barColumn} alignItems={'center'} sx={{ position: 'relative' }}>
                            {renderBar(index)}
                            <Stack alignItems={'center'} justifyContent={'center'}>
                                {axisHours.map((item, index) => (
                                    <Box key={index} p={2} sx={{ borderBottomStyle: 'solid', borderBottomColor: '#ccc', borderBottomWidth: '1px', width: '100%', }}>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>
                    ))
                }
            </Grid>
            <Grid container columns={columnInfo.totalColumn} pt={2}>
                <Grid item xs={columnInfo.firstColumn}></Grid>
                {
                    subtitles.map((item, index) => (
                        <Grid key={index} item xs={columnInfo.barColumn}>
                            <Typography variant="caption" component={'div'} textAlign={'center'}>
                                {capitalizeFirstLetter(item)}
                            </Typography>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
};

type BarType = {
    duration: number,
    maxValue: number,
};

export const Bar: React.FC<BarType> = ({ duration, maxValue }) => {
    const percentage = duration / maxValue * 100;

    return (
        <Box sx={{
            position: 'absolute',
            bottom: 0,
            top: '12%',
            backgroundColor: 'peachy.main',
            borderRadius: 4,
            width: '1em',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}>
            <Box sx={{
                backgroundColor: 'warning.main',
                height: percentage > 100 ? 100 : percentage + '%',
                bottom: 0,
                borderRadius: 4,
            }} />

        </Box>
    );
};