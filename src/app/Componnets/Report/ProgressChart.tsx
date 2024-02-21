import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { UIPaper } from '@/ui/UIPaper';

dayjs.locale(uk);

type ProgressChartType = {
};

export const ProgressChart: React.FC<ProgressChartType> = ({ }) => {
    const currentDate = dayjs();
    return (
        <>
            <UIPaper title="Project progress">
                <Grid container>
                    <Grid item xs={4}><Typography textAlign={'center'} variant="body1">{currentDate.format('MMMM')}</Typography></Grid>
                    <Grid item xs={4}><Typography textAlign={'center'} variant="body1">{currentDate.subtract(1, 'month').format('MMMM')}</Typography></Grid>
                    <Grid item xs={4}><Typography textAlign={'center'} variant="body1">{currentDate.subtract(2, 'month').format('MMMM')}</Typography></Grid>
                </Grid>
                <Grid className={styles.progressProject__row} container sx={{ position: 'relative' }}>
                    <Grid className={styles.progressProject__td} item xs={4}>
                        <Bar />
                    </Grid>
                    <Grid className={styles.progressProject__td} item xs={4}></Grid>
                    <Grid className={styles.progressProject__td} item xs={4}></Grid>
                </Grid>
            </UIPaper>
        </>
    );
};

type BarType = {

};

const Bar: React.FC<BarType> = ({ }) => {
    return (
        <Box sx={{
            position: 'absolute',
            width:'33.3%',
            left:'10%',
            height:16,
            borderRadius:4,
            background:'purple',
            top:'50%',
            transform:'translateY(-50%)',
        }}
        />
    )
}