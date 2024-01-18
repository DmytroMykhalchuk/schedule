import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
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
                        <HomeCalendar />
                        <ProjectDirectories />
                    </Stack>
                </Grid>
                <Grid item sm={12} md={8}>
                    <TasksWrapepr />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <NewComments />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Team />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Page;