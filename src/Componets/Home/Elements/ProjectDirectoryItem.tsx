import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Divider from '@mui/material/Divider';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const maxDisplayAvatarsCount = 4;

type ProjectDirectoryItemType = {
    title: string;
    users: {
        picture: string;
        name: string;
        email: string;
    }[];
    id: string;
    locale: string;
};

export const ProjectDirectoryItem: React.FC<ProjectDirectoryItemType> = ({ title, users, id, locale }) => {

    return (
        <>
            <Stack direction={'row'} alignItems={"center"} spacing={1}>
                <ShareIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2" flex={1}>
                    <Link href={`/${locale}/app/directories/${id}/kanban-dashboard`}>
                        {title}
                    </Link>
                </Typography>
                <AvatarGroup max={maxDisplayAvatarsCount} sx={{
                    '& .MuiAvatar-root': {
                        width: '25px !important', height: '25px !important',
                        fontSize: '1em',
                    }
                }}>
                    {users.map((user, index) => (
                        <Avatar key={index} src={user.picture} alt={user.name} sx={{ width: '25px !important', height: '25px !important', }} />
                    ))}
                </AvatarGroup>
            </Stack>
            <Divider sx={{ my: 1 }} />
        </>
    );
};