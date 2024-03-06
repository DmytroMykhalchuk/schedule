import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/configs/auth";
import { HomeHeader } from "@/Componets/Home/HomeHeader";
import { ProjectDirectories } from "@/Componets/Home/ProjectDirectories";
import { TasksWrapepr } from "@/Componets/Home/TasksWrapepr";
import { NewComments } from "@/Componets/Home/NewComments";
import { Team } from "@/Componets/Home/Team";

type PageType = {
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale } = params;
    const session = await getServerSession(nextAuthConfig);
    const authEmail = session?.user?.email as string;

    return (
        <>
            <Box>
                <div>
                    <HomeHeader userName={session?.user?.name || ''} userPicture={session?.user?.image || ''} />
                </div>
            </Box>
            <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                    <Stack spacing={2}>
                        {/* <HomeCalendar authEmail={authEmail} locale={locale}/> */}
                        <div>
                            <ProjectDirectories authEmail={authEmail} locale={locale} />
                        </div>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={8}>
                    <div>
                        <div>
                            <TasksWrapepr authEmail={authEmail} locale={locale} />
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={6}>
                                <div>
                                    <NewComments authEmail={authEmail} locale={locale} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6}>
                                <div>
                                    <Team limit={4} authEmail={authEmail} locale={locale} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;