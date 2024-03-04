import { HomeCalendar } from "@/Componets/Home/HomeCalendar";
import { LinkedDateCalendar } from "@/Componets/Home/LinkedDateCalendar";
import { Team } from "@/Componets/Home/Team";
import { HeaderLayout } from "@/Componets/Layouts/HeaderLayout";
import { OverviewProgress } from "@/Componets/Overview/OverviewProgress";
import { OverviewTaskUser } from "@/Componets/Overview/OverviewTaskUser";
import { getTaskByUser } from "@/Componets/Overview/actions";
import { getUserSessionAndEmail } from "@/Componets/actions";
import { UIPaper } from "@/ui/UIPaper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

type PageType = {
    params: { locale: string };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale } = params;
    const { authEmail, session } = await getUserSessionAndEmail();
    const taskTree = await getTaskByUser(authEmail);

    return (
        <>
            <HeaderLayout
                title="page_title"
                pageName="Overview"
                isCenter
                authUser={{
                    image: session?.user?.image || '',
                    name: session?.user?.name || '',
                }}
            />
            <Grid container spacing={2}>

                <Grid item xs={12} lg={6}>
                    <div>
                        {/* <HomeCalendar/> */}
                        <Stack spacing={2}>
                            <div>
                                <Team authEmail={authEmail} locale={locale} />
                            </div>
                        </Stack>
                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={2}>
                        {/* <OverviewProgress /> */}
                        <div>
                            <OverviewTaskUser taskTree={taskTree} locale={locale} />
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;