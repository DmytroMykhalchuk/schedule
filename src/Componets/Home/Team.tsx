import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { TeamItem } from './Elements/TeamItem';
import { getTeam } from '@/app/[locale]/app/add/team/actions';

type TeamType = {
    limit?: number
    authEmail: string
};

export const Team: React.FC<TeamType> = async ({ limit, authEmail }) => {
    const team = await getTeam(authEmail);

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
                            <div>
                                <TeamItem
                                    avatar={person.user.picture}
                                    name={person.user.name}
                                    email={person.user.email}
                                    role={person.role}
                                />
                            </div>
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