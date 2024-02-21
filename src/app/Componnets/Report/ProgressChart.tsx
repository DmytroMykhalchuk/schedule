import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { UIPaper } from '@/ui/UIPaper';
import { CategoryRecord, MonthPercentage, MonthProgressSubMonths, MonthProgressType } from '@/server/actions/types';
import { ReactNode } from 'react';
import { getFillingMonthPrecentage } from '@/utlis/getFillingMonthPrecentage';

dayjs.locale(uk);

type ProgressChartType = {
    progress?: MonthProgressType,
    categories: CategoryRecord[],
};

export const ProgressChart: React.FC<ProgressChartType> = ({ progress, categories }) => {
    const currentDate = dayjs();

    const monthPositions = {
        [currentDate.subtract(2, 'month').month() + 1]: 0,
        [currentDate.subtract(1, 'month').month() + 1]: 1,
        [currentDate.month() + 1]: 2,
    };

    const renderBars = (months: MonthProgressSubMonths, category?: CategoryRecord): JSX.Element[] => {
        const bars = [] as JSX.Element[];
        let counter = 0;

        for (const month in months) {
            if (Object.prototype.hasOwnProperty.call(months, month)) {
                const element = months[month];

                const position = monthPositions[month] || 0;

                bars.push(
                    <Bar
                        key={counter}
                        position={position}
                        filling={getFillingMonthPrecentage(element)}
                    />
                );
                counter++;
            }
        }

        return bars;
    }

    const renderRows = (): JSX.Element[] => {
        const bars = [] as JSX.Element[];
        console.log(progress)
        for (const categoryId in progress) {
            if (Object.prototype.hasOwnProperty.call(progress, categoryId)) {
                const element = progress[categoryId];
                const targetCategory = categories.find(item => item._id === categoryId);

                bars.push(
                    <TableRowWrapper key={categoryId}>
                        {renderBars(element, targetCategory)}
                    </TableRowWrapper>
                )
            }
        }

        return bars;
    };


    return (
        <>
            <UIPaper title="Project progress">
                <Grid container>
                    <Grid item xs={4}><Typography textAlign={'center'} variant="body1">{currentDate.subtract(2, 'month').format('MMMM')}</Typography></Grid>
                    <Grid item xs={4}><Typography textAlign={'center'} variant="body1">{currentDate.subtract(1, 'month').format('MMMM')}</Typography></Grid>
                    <Grid item xs={4}><Typography textAlign={'center'} variant="body1">{currentDate.format('MMMM')}</Typography></Grid>
                </Grid>
                {renderRows()}

            </UIPaper>
        </>
    );
};

type TableRowWrapperType = {
    children: ReactNode,
};
const TableRowWrapper: React.FC<TableRowWrapperType> = ({ children }) => (
    <Grid className={styles.progressProject__row} container sx={{ position: 'relative' }}>
        <Grid className={styles.progressProject__td} item xs={4}>
            {children}
        </Grid>
        <Grid className={styles.progressProject__td} item xs={4}></Grid>
        <Grid className={styles.progressProject__td} item xs={4}></Grid>
    </Grid>
)

type BarType = {
    position: number,
    filling: MonthPercentage[],
};

const Bar: React.FC<BarType> = ({ position, filling }) => {

    return (
        <>
            {
                filling.map((item, index) => {
                    const left = ((position - 1) * 33) + (33 / 100 * item.from);
                    console.log({ left })
                    return (
                        <Box key={index} sx={{
                            position: 'absolute',
                            width: 33.3 * position + '%',
                            left: left + '%',
                            height: 16,
                            borderRadius: 4,
                            background: 'purple',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                        />
                    );
                })
            }
        </>
    );
};