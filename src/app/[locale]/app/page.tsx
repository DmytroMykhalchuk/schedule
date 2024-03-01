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
};

const Page: React.FC<PageType> = async () => {
    const session = await getServerSession(nextAuthConfig);
    const authEmail = session?.user?.email as string;

    return (
        <>
            <Box>
                <HomeHeader userName={session?.user?.name || ''} userPicture={session?.user?.image || ''} />
            </Box>
            <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                    <Stack spacing={2}>
                        {/* <HomeCalendar authEmail={authEmail} /> */}
                        <div>
                            <ProjectDirectories authEmail={authEmail} />
                        </div>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={8}>
                    <div>
                        <div>
                            <TasksWrapepr authEmail={authEmail} />
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <div>
                                    <NewComments authEmail={authEmail} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div>
                                    <Team limit={4} authEmail={authEmail} />
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