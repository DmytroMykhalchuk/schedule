import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { defaultFirstUserId, getProjectUsers } from "../actions";

type UserSelectType = {
    fieldName: string
    showEmail?: boolean
    defaultUserId?: string
    isDisabled?: boolean
};

export const UserSelect: React.FC<UserSelectType> = async ({ fieldName, showEmail = false, defaultUserId, isDisabled }) => {
    const users = await getProjectUsers() || [];

    defaultUserId || users.unshift({
        _id: defaultFirstUserId,
        name: '-',
        picture: '',
        email: '',
    });

    return (
        <>
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
                defaultValue={defaultUserId ? defaultUserId : '0'}
                required
                name={fieldName}
                disabled={isDisabled}
            >
                {
                    users.map((user, index) => (
                        <MenuItem value={user._id.toString()} key={index}>
                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <Avatar src={user.picture} alt={user.name} />
                                <Stack>
                                    <Typography variant="body1">{user.name}</Typography>
                                    {showEmail &&
                                        <Typography variant="caption">{user.email}</Typography>
                                    }
                                </Stack>
                            </Stack>
                        </MenuItem>
                    ))
                }
            </Select>
            {defaultUserId && <input type="hidden" name="user" value={defaultUserId} />}
        </>

    );
};