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
    params: {
        locale: string;
    };
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
            <Grid container spacing={2} pt={2}>
                <Grid item xs={12} lg={12} mb={2}>
                    <div>
                        <Stack spacing={2}>
                            <div>
                                <CountCards directoriesCount={info.projectCount} usersCount={info.userCount} locale={locale} />
                            </div>
                            <div>
                                <ProgressChart progress={info.progress} categories={info.categories} locale={locale} />
                            </div>
                            <div>
                                <ProjectCategories categories={info.categories} locale={locale} />
                            </div>
                        </Stack>
                    </div>
                </Grid>
                <Grid item xs={12} lg={12} mb={2}>
                    <div>
                        <Stack spacing={2}>
                            <div>
                                <WorkingHoursWrapper monthWorkHours={info.monthWorkHours} weekWorkHours={info.weekWorkHours} locale={locale} />
                            </div>
                            <div>
                                <Revenue chartData={info.revenue} locale={locale} />
                            </div>
                        </Stack>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;