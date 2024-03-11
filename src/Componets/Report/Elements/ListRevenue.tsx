import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import uk from 'dayjs/locale/uk';
import { PaginationBar } from '../../Common/PaginationBar';
import { revenuePerPage } from '@/server/constants';
import { RecordActions } from '../../Common/RecordActions';
import styles from './../styles.module.scss';
import { getRevenue } from '@/app/[locale]/app/charts/add-revenue/actions';
import { getUserSessionAndEmail } from '@/Componets/actions';

type ListRevenueType = {
    page?: number;
    locale: string;
};

export const ListRevenue: React.FC<ListRevenueType> = async ({ page = 1, locale }) => {
    locale === 'uk' && dayjs.locale(uk);
    const { authEmail } = await getUserSessionAndEmail();
    const revenues = await getRevenue(page, authEmail);

    return (
        <Stack spacing={2}>
            {
                revenues.revenues.map((item, index) => (
                    <Stack className={styles.record} key={index} direction={'row'} spacing={2}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'peachy.main',
                            }
                        }}
                    >
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
            {
                revenues.revenues.length > 0 &&
                <Stack>
                    <PaginationBar total={revenues.total} limit={revenuePerPage} page={page} />
                </Stack>
            }
        </Stack>
    );
};