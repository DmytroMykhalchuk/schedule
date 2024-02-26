import { HomeCalendar } from "@/app/Componnets/Home/HomeCalendar";
import { LinkedDateCalendar } from "@/app/Componnets/Home/LinkedDateCalendar";
import { Team } from "@/app/Componnets/Home/Team";
import { HeaderLayout } from "@/app/Componnets/Layouts/HeaderLayout";
import { OverviewProgress } from "@/app/Componnets/Overview/OverviewProgress";
import { OverviewTaskUser } from "@/app/Componnets/Overview/OverviewTaskUser";
import { UIPaper } from "@/ui/UIPaper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <>
            <HeaderLayout
                title="Project overview"
                subtitle=""
                isCenter
            />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* <HomeCalendar/> */}
                    <Stack spacing={2}>
                        <Team />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        {/* <OverviewProgress /> */}
                        <OverviewTaskUser />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;