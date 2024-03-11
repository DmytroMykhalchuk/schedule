import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import { ColumnItem } from '@/Componets/Directory/ColumnItem';
import { HeaderWithBreadcrumbs } from '@/Componets/Layouts/HeaderWithBreadcrumbs';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { ByDirectoryOrCategoryTaskRecord, CategoryRecord } from '@/server/actions/types';
import { useTranslations } from 'next-intl';
import { getCategoryAndTasks } from './actions';
import { notFound } from 'next/navigation';

type PageType = {
    params: {
        id: string;
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { id, locale } = params;

    const { authEmail } = await getUserSessionAndEmail()
    const info = await getCategoryAndTasks(id, authEmail);

    if(!info.category){
        return notFound();
    }

    return (
        <Stack>
            <div>
                <Content category={info.category} tasks={info.tasks || []} locale={locale} />
            </div>
        </Stack>
    );
};

type ContentType = {
    category: CategoryRecord;
    tasks: ByDirectoryOrCategoryTaskRecord[];
    locale: string;
};

const Content: React.FC<ContentType> = ({ category, tasks, locale }) => {
    const translation = useTranslations('MyTasks');
    const titles = [
        { linkLabel: translation('overview_title'), linkHref: `/${locale}/app/charts`, },
        { linkLabel: category.name, linkHref: `/${locale}/app/add/category/${category._id}`, },
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