import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Divider from '@mui/material/Divider';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type ProjectDirectoryItemType = {
    title: string
    users: { image: string, name: string }[]
};

export const ProjectDirectoryItem: React.FC<ProjectDirectoryItemType> = ({ title, users }) => {

    return (
        <>
            <Stack direction={'row'} alignItems={"center"} spacing={1}>
                <ShareIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2" flex={1}>{title}</Typography>
                <AvatarGroup max={4}>
                    {users.map((user, index) => (
                        <Avatar key={index} src={user.image} alt={user.name} sx={{ width: 25, height: 25, }} />
                    ))}
                </AvatarGroup>
            </Stack>
            <Divider sx={{ my: 1 }} />
        </>
    );
};