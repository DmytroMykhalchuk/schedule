import Grid from '@mui/material/Grid';
import { CountCards } from '@/app/Componnets/Report/CountCards';
import { HeaderLayout } from '@/app/Componnets/Layouts/HeaderLayout';
import { ProgressChart } from '@/app/Componnets/Report/ProgressChart';
import { ProjectCategories } from '@/app/Componnets/Report/ProjectCategories';
import { TotalWorkingHours } from '@/app/Componnets/Report/TotalWorkingHours';
import { Revenue } from '@/app/Componnets/Report/Revenue';

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <>
            <HeaderLayout
                subtitle=""
                title="Report"
                isCenter
            />
            <Grid container>
                <Grid xs={12} lg={12}>
                    <CountCards />
                    <ProgressChart />
                    <ProjectCategories />
                </Grid>
                <Grid xs={12} lg={12}>
                    <TotalWorkingHours />
                    <Revenue />
                </Grid>
            </Grid>
        </>
    );
};

export default Page;