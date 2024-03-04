import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { CountCards } from '@/Componets/Report/CountCards';
import { getPageInfo } from './actions';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { HeaderLayout } from '@/Componets/Layouts/HeaderLayout';
import { ProgressChart } from '@/Componets/Report/ProgressChart';
import { ProjectCategories } from '@/Componets/Report/ProjectCategories';
import { Revenue } from '@/Componets/Report/Revenue';
import { WorkingHoursWrapper } from '@/Componets/Report/WorkingHoursWrapper';

type PageType = {
    params: { locale: string };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale } = params;
    const { authEmail, session } = await getUserSessionAndEmail();
    const info = await getPageInfo(authEmail);

    return (
        <>
            <HeaderLayout
                title="page_title"
                pageName='Report'
                isCenter
                authUser={{
                    name: session?.user?.name || '',
                    image: session?.user?.image || '',
                }}
            />
            <Grid container spacing={2}>
                <Grid xs={12} lg={12} mb={2}>
                    <Stack spacing={2}>
                        <CountCards directoriesCount={info.projectCount} usersCount={info.userCount} />
                        <ProgressChart progress={info.progress} categories={info.categories} />
                        <ProjectCategories categories={info.categories} locale={locale}/>
                    </Stack>
                </Grid>
                <Grid xs={12} lg={12} mb={2}>
                    <Stack spacing={2}>
                        <WorkingHoursWrapper monthWorkHours={info.monthWorkHours} weekWorkHours={info.weekWorkHours} />
                        <Revenue chartData={info.revenue} />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;