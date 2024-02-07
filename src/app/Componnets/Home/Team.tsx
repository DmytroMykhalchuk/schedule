
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { Comments } from "./Elements/Comments";
import { TagItem } from "./Elements/TagItem";
import { TeamItem } from "./Elements/TeamItem";
import { cookies } from "next/headers";
import { ProjectActions } from "@/server/actions/ProjectActions";
import Link from "next/link";
import { getAuthParams } from "../actions";

const getTeam = async () => {
    const { projectId, sessionId } =  await getAuthParams();

    const users = await ProjectActions.getTeam(projectId, sessionId);
    return users;
}

type TeamType = {
};

export const Team: React.FC<TeamType> = async ({ }) => {
    const team = await getTeam();

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6">Team Directory</Typography>
            <Grid container spacing={2} alignItems={'stretch'}>
                {
                    team.map(person => (
                        <Grid key={person._id} item xs={12} sm={6}>
                            <TeamItem
                                avatar={person.picture}
                                name={person.name}
                                role={person.role}
                                email={person.email}
                            />
                        </Grid>
                    ))
                }
                <Grid item xs={12} sm={6}>
                    <Link href='/app/add/team'>
                        <TeamItem
                            avatar={''}
                            name={'Add member'}
                            role={''}
                            email={''}
                            isAaddItem
                        />
                    </Link>
                </Grid>

            </Grid>
        </Paper>
    );
};