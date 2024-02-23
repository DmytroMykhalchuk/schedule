import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { getRevenue } from '@/app/app/charts/add-revenue/actions';
import { PaginationBar } from '../../Common/PaginationBar';
import { revenuePerPage } from '@/server/constants';
import { RecordActions } from '../../Common/RecordActions';
import styles from './../styles.module.scss';

dayjs.locale(uk);

type ListRevenueType = {
    page?: number
};

export const ListRevenue: React.FC<ListRevenueType> = async ({ page = 1 }) => {
    const revenues = await getRevenue(page);
    
    return (
        <Stack spacing={2}>
            {
                revenues.revenues.map((item, index) => (
                    <Stack className={styles.record} key={index} direction={'row'} spacing={2}>
                        <Box flex={1}>
                            <Typography variant="h6" sx={{
                                fontWeight: 600,
                                color: item.cost > 0 ? 'secondary.main' : 'warning.main',
                            }}>{item.cost}$</Typography>
                            <Typography variant="subtitle2">{dayjs(item.targetDate).format('DD MMMM YYYY')} {item.note && ': ' + item.note}</Typography>
                        </Box>
                        <Box className={styles.record__action}>
                            <RecordActions
                                deletePath={`delete/${item._id}`}
                                editPath={'edit/' + item._id}
                            />
                        </Box>
                    </Stack>
                ))
            }
            <Stack>
                <PaginationBar total={revenues.total} limit={revenuePerPage} page={page} />
            </Stack>
        </Stack>
    );
};