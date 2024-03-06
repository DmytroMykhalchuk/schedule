'use client';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { ProjectUsers } from "@/server/actions/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setTaskFormAssignee } from "@/redux/task/taskReducer";

type UserSelectType = {
    fieldName: string;
    showEmail?: boolean;
    defaultUserId?: string;
    isDisabled?: boolean;
    users: ProjectUsers[];
    onChange?: (userId: string) => void;
};

export const UserSelect: React.FC<UserSelectType> = ({ fieldName, showEmail = false, defaultUserId, isDisabled, users, onChange }) => {
    const dispatch: AppDispatch = useDispatch();

    const [assignee, setAssignee] = useState(defaultUserId ? defaultUserId : '0');

    useEffect(() => {
        return () => {
            dispatch(setTaskFormAssignee({ assignee: '' }))
        }
    }, []);

    useEffect(() => {
        setAssignee(defaultUserId ? defaultUserId : '0');
    }, [defaultUserId]);

    const onSelectAssignee = (event: SelectChangeEvent) => {
        const assignee = event.target.value;
        setAssignee(assignee);
        dispatch(setTaskFormAssignee({ assignee }));
        onChange && onChange(assignee);
    };

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
                value={assignee}
                onChange={onSelectAssignee}
                required
                name={fieldName}
                disabled={isDisabled}
            >
                {
                    users?.map((user, index) => (
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