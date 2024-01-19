
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { Comments } from "./Elements/Comments";
import { TagItem } from "./Elements/TagItem";
import { TeamItem } from "./Elements/TeamItem";

type TeamType = {
};

export const Team: React.FC<TeamType> = ({ }) => {
    const team = [
        {
            image: 'https://source.unsplash.com/random?men&3',
            name: "Andriy",
            role: "Boss",
        },
        {
            image: 'https://source.unsplash.com/random?men&4',
            name: "Oleg",
            role: "PM",
        },
    ];

    return (
        <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6">Team Directory</Typography>
            <Grid container spacing={2}>
                {
                    team.map((person, index) => (
                        <Grid key={index} item xs={12} sm={6}>
                            <TeamItem
                                avatar={person.image}
                                name={person.name}
                                role={person.role}

                            />
                        </Grid>
                    ))
                }

            </Grid>
        </Paper>
    );
};