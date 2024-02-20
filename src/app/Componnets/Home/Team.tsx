import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { getAuthParams } from '../actions';
import { ProjectActions } from '@/server/actions/ProjectActions';
import { TeamItem } from './Elements/TeamItem';


const getTeam = async () => {
    const authParams = await getAuthParams();
    const users = await ProjectActions.getTeam(authParams);
    return users;
}

type TeamType = {
    limit?: number
};

export const Team: React.FC<TeamType> = async ({ limit }) => {
    const team = await getTeam();

    if (limit && team.length > limit) {
        team.length
    }
    
    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6">Team Directory</Typography>
            <Grid container spacing={2} alignItems={'stretch'}>
                {
                    team.map((person, index) => (
                        <Grid key={index} item xs={12} sm={6}>
                            <TeamItem
                                avatar={person.user.picture}
                                name={person.user.name}
                                email={person.user.email}
                                role={person.role}
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