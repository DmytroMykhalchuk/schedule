import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import { ColumnItem } from '@/Componets/Directory/ColumnItem';
import { getDirectoryAndTasks } from './actions';
import { HeaderWithBreadcrumbs } from '@/Componets/Layouts/HeaderWithBreadcrumbs';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { ByDirectoryOrCategoryTaskRecord, DirectoryType } from '@/server/actions/types';
import { useTranslations } from 'next-intl';

type PageType = {
    params: {
        id: string;
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { id, locale } = params;

    const { authEmail } = await getUserSessionAndEmail()
    const info = await getDirectoryAndTasks(id, authEmail);

    return (
        <Stack>
            <div>
                <Content directory={info.directory} tasks={info.tasks || []} locale={locale} />
            </div>
        </Stack>
    );
};

type ContentType = {
    directory: DirectoryType;
    tasks: ByDirectoryOrCategoryTaskRecord[];
    locale: string;
};

const Content: React.FC<ContentType> = ({ directory, tasks, locale }) => {
    const translation = useTranslations('MyTasks');
    const titles = [
        { linkLabel: translation('overview_title'), linkHref: `/${locale}/app/charts`, },
        { linkLabel: directory.name, linkHref: `/${locale}/app/add/directories/${directory._id}`, },
        { linkLabel: translation('kanban_view'), linkHref: '', },
    ];

    return (
        <>
            <HeaderWithBreadcrumbs
                subtitle=""
                title={titles}
            />
            <Grid container sx={{ flex: 1 }}>
                <Grid className={styles.tableColumn} item xs={12} lg={4}>
                    <div>
                        <ColumnItem
                            tasks={tasks?.filter(item => item.status === 'not_started')}
                            title={translation('statuses.not_started_title')}
                            locale={locale}
                            createTaskLabel={translation('add_task')}
                        />
                    </div>
                </Grid>
                <Grid className={styles.tableColumn} item xs={12} lg={4}>
                    <ColumnItem
                        tasks={tasks?.filter(item => item.status === 'in_progress')}
                        title={translation('statuses.in_progress_title')}
                        locale={locale}
                        createTaskLabel={translation('add_task')}
                    />
                </Grid>
                <Grid className={styles.tableColumn} item xs={12} lg={4}>
                    <ColumnItem
                        tasks={tasks?.filter(item => item.status === 'done')}
                        title={translation('statuses.done_title')}
                        locale={locale}
                        createTaskLabel={translation('add_task')}
                    />
                </Grid>
            </Grid>
        </>
    );
};
export default Page;