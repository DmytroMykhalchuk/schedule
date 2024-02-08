import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'
import { HomeHeader } from "../Componnets/Home/HomeHeader";
import { ProjectDirectories } from "../Componnets/Home/ProjectDirectories";
import { HomeCalendar } from "../Componnets/Home/HomeCalendar";
import { TasksWrapepr } from "../Componnets/Home/TasksWrapepr";
import { NewComments } from "../Componnets/Home/NewComments";
import { Team } from "../Componnets/Home/Team";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <>
            <Box>
                <HomeHeader />
            </Box>
            <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                    <Stack spacing={2}>
                        {/* <HomeCalendar /> */}
                        <div>
                            <ProjectDirectories />
                        </div>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={8}>
                    <div>
                        <div>
                            <TasksWrapepr />
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <NewComments />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div>
                                    <Team />
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