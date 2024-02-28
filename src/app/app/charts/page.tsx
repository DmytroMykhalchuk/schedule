import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { CountCards } from '@/app/Componnets/Report/CountCards';
import { getPageInfo } from './actions';
import { getUserSessionAndEmail } from '@/app/Componnets/actions';
import { HeaderLayout } from '@/app/Componnets/Layouts/HeaderLayout';
import { ProgressChart } from '@/app/Componnets/Report/ProgressChart';
import { ProjectCategories } from '@/app/Componnets/Report/ProjectCategories';
import { Revenue } from '@/app/Componnets/Report/Revenue';
import { TotalWorkingHours } from '@/app/Componnets/Report/TotalWorkingHours';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const { authEmail, session } = await getUserSessionAndEmail();
    const info = await getPageInfo(authEmail);

    return (
        <>
            <HeaderLayout
                subtitle=""
                title="Report"
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
                        <ProjectCategories categories={info.categories} />
                    </Stack>
                </Grid>
                <Grid xs={12} lg={12} mb={2}>
                    <Stack spacing={2}>
                        <TotalWorkingHours monthWorkHours={info.monthWorkHours} weekWorkHours={info.weekWorkHours} />
                        <Revenue chartData={info.revenue} />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;