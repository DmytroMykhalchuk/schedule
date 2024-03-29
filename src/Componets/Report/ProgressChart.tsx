import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { CategoryRecord, MonthProgressType } from '@/server/actions/types';
import { ReactNode } from 'react';
import { UIPaper } from '@/ui/UIPaper';
import { useTranslations } from 'next-intl';

type ProgressChartType = {
    progress?: MonthProgressType;
    categories: CategoryRecord[];
    locale: string;
};

export const ProgressChart: React.FC<ProgressChartType> = ({ progress, categories, locale }) => {
    locale === 'uk' && dayjs.locale(uk);

    const translation = useTranslations('Report');
    const currentDate = dayjs();

    const renderBars = (range: { from: number, to: number }[], color?: string): JSX.Element[] => {
        return range.map((item, index) => (
            <Bar
                key={index}
                from={item.from}
                to={item.to}
                color={color}
            />
        ))

    }

    const renderRows = (): JSX.Element[] => {
        const bars = [] as JSX.Element[];

        for (const categoryId in progress) {
            if (Object.prototype.hasOwnProperty.call(progress, categoryId)) {
                const element = progress[categoryId];
                const targetCategory = categories.find(item => item._id === categoryId);

                bars.push(
                    <TableRowWrapper key={categoryId}>
                        {renderBars(element, targetCategory?.color)}
                    </TableRowWrapper>
                );
            }
        }

        return bars;
    };


    return (
        <>
            <UIPaper title={translation('project_progress')}>
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
    <Grid className={styles.progressProject__row} container sx={{ position: 'relative', overflow: 'hidden' }}>
        <Grid className={styles.progressProject__td} item xs={4}>
            {children}
        </Grid>
        <Grid className={styles.progressProject__td} item xs={4}></Grid>
        <Grid className={styles.progressProject__td} item xs={4}></Grid>
    </Grid>
)

type BarType = {
    from: number,
    to: number,
    color?: string
};

const Bar: React.FC<BarType> = ({ from, to, color }) => {

    return (
        <Box sx={{
            position: 'absolute',
            width: to - from + '%',
            left: from + '%',
            height: 16,
            borderRadius: 4,
            background: color || 'purple',
            top: '50%',
            transform: 'translateY(-50%)',
        }}
        />
    );
};