import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import { ColumnItem } from '@/Componets/Directory/ColumnItem';
import { getDirectoryAndTasks } from './actions';
import { HeaderWithBreadcrumbs } from '@/Componets/Layouts/HeaderWithBreadcrumbs';
import { getUserSessionAndEmail } from '@/Componets/actions';

type PageType = {
    params: { id: string }
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { authEmail } = await getUserSessionAndEmail()

    const { id } = params;
    const info = await getDirectoryAndTasks(id, authEmail);

    const titles = [
        { linkLabel: 'Project overview', linkHref: '/app/charts', },
        { linkLabel: info.directory.name, linkHref: '/app/charts', },
        { linkLabel: 'Kanban view', linkHref: '', },
    ];

    return (
        <Stack>
            <HeaderWithBreadcrumbs
                subtitle=""
                title={titles}
            />
            <Grid container sx={{ flex: 1 }}>
                <Grid className={styles.tableColumn} item xs={4}>
                    <ColumnItem tasks={info.tasks?.filter(item => item.status === 'not_started')} title='To do' />
                </Grid>
                <Grid className={styles.tableColumn} item xs={4}>
                    <ColumnItem tasks={info.tasks?.filter(item => item.status === 'in_progress')} title='In progress' />
                </Grid>
                <Grid className={styles.tableColumn} item xs={4}>
                    <ColumnItem tasks={info.tasks?.filter(item => item.status === 'done')} title='Done' />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default Page;