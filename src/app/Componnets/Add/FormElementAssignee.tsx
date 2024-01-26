import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { defaultFirstUserId, getProjectUsers } from './actions';

type FormElementAssigneeType = {
};

export const FormElementAssignee: React.FC<FormElementAssigneeType> = async ({ }) => {
    const users = await getProjectUsers() || [];

    users.unshift({
        _id: defaultFirstUserId,
        name: '-',
        picture: '',
    })

    return (
        <>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={3} justifyContent={'center'}>
                    <Stack justifyContent={'center'} height={'100%'}>
                        <Typography variant="body1" color={'gray'}>Assignee</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={9}>
                    <Select
                        size='small'
                        color='warning'
                        sx={{
                            '& svg.MuiSelect-icon': {
                                display: 'none',
                            },
                            '& .MuiSelect-select': {
                                p: 0,
                            },
                            '& fieldset': {
                                border: 'none',
                            }
                        }}
                        defaultValue={'0'}
                        required
                        name='assignee'
                    >
                        {
                            users.map((user, index) => (
                                <MenuItem value={user._id} key={index}>
                                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                        <Avatar src={user.picture} alt={user.name} />
                                        <Typography variant="body1">{user.name}</Typography>
                                    </Stack>
                                </MenuItem>
                            ))
                        }
                    </Select>
                </Grid>
            </Grid>
        </>
    );
};