import { HomeCalendar } from "@/app/Componnets/Home/HomeCalendar";
import { LinkedDateCalendar } from "@/app/Componnets/Home/LinkedDateCalendar";
import { Team } from "@/app/Componnets/Home/Team";
import { HeaderLayout } from "@/app/Componnets/Layouts/HeaderLayout";
import { OverviewProgress } from "@/app/Componnets/Overview/OverviewProgress";
import { OverviewTaskUser } from "@/app/Componnets/Overview/OverviewTaskUser";
import { getUserSessionAndEmail } from "@/app/Componnets/actions";
import { UIPaper } from "@/ui/UIPaper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const { authEmail, session } = await getUserSessionAndEmail();

    return (
        <>
            <HeaderLayout
                title="Project overview"
                subtitle=""
                isCenter
                authUser={{
                    image: session?.user?.image || '',
                    name: session?.user?.name || '',
                }}
            />
            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <div>
                        {/* <HomeCalendar/> */}
                        <Stack spacing={2}>
                            <div>
                                <Team authEmail={authEmail} />
                            </div>
                        </Stack>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        {/* <OverviewProgress /> */}
                        <div>
                            <OverviewTaskUser authEmail={authEmail} />
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;