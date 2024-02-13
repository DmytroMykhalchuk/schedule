
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UserSelect } from './UserSelect';
import { getProjectUsers } from '../actions';
import { defaultFirstUserId } from "../actions";

type FormElementAssigneeType = {
    fieldName: string
    defaultValue: string
};

export const FormElementAssignee: React.FC<FormElementAssigneeType> = async ({ fieldName, defaultValue }) => {
    const users = await getProjectUsers() || [];

    defaultValue || users.unshift({
        _id: defaultFirstUserId,
        name: '-',
        picture: '',
        email: '',
    });

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={3} justifyContent={'center'}>
                <Stack justifyContent={'center'} height={'100%'}>
                    <Typography variant="body1" color={'gray'}>Assignee</Typography>
                </Stack>
            </Grid>
            <Grid item xs={9}>
                <div>
                    <UserSelect fieldName={fieldName} defaultUserId={defaultValue} users={users} />
                </div>
            </Grid>
        </Grid>
    );
};