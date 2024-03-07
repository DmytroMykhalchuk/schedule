import Link from 'next/link';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { UserInfoRecord } from '@/server/types/userTypes';

type UserSearchItemType = {
    user: UserInfoRecord;
};

export const UserSearchItem: React.FC<UserSearchItemType> = ({ user }) => {

    return (
        <Stack direction={'row'} spacing={1}>
            <Avatar src={user.picture} />
            <Box>
                <Typography variant="subtitle1">{user.name}</Typography>
                <Link href={`mailto:${user.email}`}>
                    <Typography variant="caption">{user.email}</Typography>
                </Link>
            </Box>
        </Stack>
    );
};