import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import uk from 'dayjs/locale/uk';
import { getCategoriesList } from '../Add/actions';
import { UIPaper } from '@/ui/UIPaper';
import Typography from '@mui/material/Typography'
import { getUserSessionAndEmail } from '../actions';

dayjs.locale(uk)

type OverviewProgressType = {
};

export const OverviewProgress: React.FC<OverviewProgressType> = async ({ }) => {
    const { authEmail } = await getUserSessionAndEmail();
    const categories = await getCategoriesList(authEmail);

    const currentDate = dayjs();

    const getPrevMonths = (count = 6): string[] => {
        const names = [] as string[];
        for (let index = 0; index < count; index++) {
            names.push(
                currentDate.subtract(index, 'month').format('MMMM')
            );
        }
        return names;
    };

    return (
        <UIPaper title="Project progress">
            <Grid container spacing={1}>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={2} sx={{
                        backgroundColor: 'peachy.main',
                        p: 1,
                        borderRadius: 2,
                        width: '100%',
                    }}>
                        {
                            getPrevMonths().map((month, index) => (
                                <Typography key={index} variant="caption" color={'grey'}>{month}</Typography>
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item xs={3} >
                    <Stack spacing={1} sx={{
                        backgroundColor: 'peachy.main',
                        borderRadius: 2,
                    }}>
                        {
                            categories.map((item, index) => (
                                <Typography key={index} variant="caption" color="grey" sx={{ px: 1, }}>{item.name}</Typography>
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item xs={9}>
                    <Stack spacing={1}>
                        {
                            categories.map((item, index) => (
                                <Stack key={index} direction={'row'} sx={{ position: 'relative', p: 1, }}>
                                    {/* 1 */}
                                    <Bar positionNumber={index} />
                                </Stack>
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
        </UIPaper>
    );
};

type BarType = {
    positionNumber: number
};

export const Bar: React.FC<BarType> = ({ positionNumber }) => {

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    width: '20%',
                    left: '10%',
                    height: '16px',
                    top: 4 * positionNumber + 'px',
                    backgroundColor: 'green',
                    borderRadius: 4,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: '30%',
                    left: '50%',
                    height: '16px',
                    top: 4 * positionNumber + 'px',
                    backgroundColor: 'yellow',
                    borderRadius: 4,
                }}
            />
        </>
    );
};