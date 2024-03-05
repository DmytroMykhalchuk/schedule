import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { capitalizeFirstLetter } from '@/utlis/capitalizeFirstLetter';
import { green, purple } from '@mui/material/colors';
import { RevenueChartType } from '@/server/actions/types';
import { UIAvarageCaption } from '../UI/UIAvarageCaption';
import { UIPaper } from '@/ui/UIPaper';
import { useTranslations } from 'next-intl';

dayjs.locale(uk);


type RevenueType = {
    chartData: RevenueChartType
};

export const Revenue: React.FC<RevenueType> = ({ chartData }) => {
    const translation = useTranslations('Report');
    const chartInfo = extractDataChart(chartData);

    const currentDate = dayjs();
    const mapMonth = {} as { [index: number]: { monthPosition: string, monthName: string } };

    Array.from({ length: 12 }).map((_, index) => {
        const [monthPosition, monthName] = currentDate.subtract(index, 'month').format('M MMM').split(' ');
        mapMonth[index] = { monthPosition, monthName };
    });

    const renderCreatingButton = (): JSX.Element => {
        return (
            <Link href='add-revenue'>
                <Button variant="outlined" color='secondary'
                    startIcon={<AddIcon />}
                    sx={{ textTransform: 'none' }}>
                    {translation('add_new_revenue')}
                </Button>
            </Link>
        );
    };


    return (
        <>
            <UIPaper title={translation('project_revenue.title')}
                titleSlot={renderCreatingButton()}
            >
                <Stack direction={'row'} spacing={3} alignItems={'center'}>
                    <Typography variant="h4">
                        {chartInfo.total >= 0 ? '+' : '-'}
                        ${chartInfo.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Typography>
                    <UIAvarageCaption
                        caption={translation('project_revenue.avg_per_month', { cost: chartInfo.avarage })}
                        fontColor='secondary.main'
                        backgroundColor={'#E3FFEB'}
                    />
                </Stack>
                <Grid container columns={14}>
                    <Grid item xs={2}>
                        <Stack>
                            {chartInfo.rangeY.reverse().map((item, index) => (
                                <Box key={index} p={2} sx={{ position: 'relative', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'transparent' }}>
                                    <Typography textAlign={'center'} component={'div'} variant="caption" position={'absolute'} sx={{ bottom: '-25%', }}>{item} $</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>
                    {
                        Array.from({ length: 12 }).map((_, index) => {
                            const monthInfo = mapMonth[11 - index];
                            const value = chartData[+monthInfo.monthPosition];

                            return (
                                <Grid key={index} item xs={1} alignItems={'center'} sx={{ position: 'relative' }}>
                                    <Bar isLoverAvarage={value < chartInfo.avarage} cost={value} maxCost={chartInfo.rangeY[chartInfo.rangeY.length - 1]} />
                                    <Stack alignItems={'center'} justifyContent={'center'}>
                                        {chartInfo.rangeY.reverse().map((_, index) => (
                                            <Box key={index} p={2} sx={{ borderBottomStyle: 'solid', borderBottomColor: '#ccc', borderBottomWidth: '1px', width: '100%', }}>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Grid>
                            );
                        })
                    }
                </Grid>
                <Grid container columns={14} pt={2}>
                    <Grid item xs={2}></Grid>
                    {
                        Array.from({ length: 12 }).map((_, index) => (
                            <Grid key={index} item xs={1}>
                                <Typography variant="caption" component={'div'} textAlign={'center'}>
                                    {capitalizeFirstLetter(mapMonth[11 - index].monthName)}
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
    cost: number,
    maxCost: number,
};

const Bar: React.FC<BarType> = ({ isLoverAvarage, cost, maxCost }) => {
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
                height: cost / maxCost * 100 + '%',
                bottom: 0,
                borderRadius: 4,
            }} />

        </Box>
    );
};

const extractDataChart = (chartData: RevenueChartType) => {
    let total = 0;
    let counter = 0;
    let maxValue = 0;
    for (const key in chartData) {
        if (Object.prototype.hasOwnProperty.call(chartData, key)) {
            const cost = chartData[key];
            total += cost;
            if (maxValue < cost) {
                maxValue = cost;
            }
            counter++;
        }
    }

    let roundedValue = 10;

    for (let i = 0; i < 30; i++) {
        const formattedIndex = i + 1;
        const isN = formattedIndex % 2;

        let currentValue = 10 ** Math.ceil(formattedIndex / 2);

        if (isN === 0) {
        } else {
            currentValue *= 5;
        }

        roundedValue = currentValue;
        if (roundedValue > maxValue) {
            break;
        }
    }

    const rangeY = [0, roundedValue * 0.25, roundedValue * 0.5, roundedValue * 0.75, roundedValue];

    const avarageValue = Math.round(total / counter);
    
    return {
        avarage: isNaN(avarageValue) ? 0 : avarageValue,
        total, rangeY,
    };
}