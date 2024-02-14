import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


type CommentItemType = {
    projectName: string,
    personName: string,
    message: string
    avatar: string
    taskId: string
    timeDiff?: string
};

export const CommentItem: React.FC<CommentItemType> = ({ projectName, personName, message, avatar, taskId, timeDiff }) => {
    return (
        <Link href={'/app/my-tasks/' + taskId}>
            <Stack direction={'row'} spacing={2} mb={2} alignItems={'center'}
                sx={{
                    bgcolor: 'peachy.light',
                    p: 1,
                    borderRadius: 4,
                }}
            >
                <Avatar src={avatar} alt={personName} />
                <Stack flex={1}>
                    <Typography variant="subtitle1">{`${personName} in ${projectName}`}</Typography>
                    <Typography variant="subtitle2" textOverflow={'ellipsis'} fontWeight={600}>{message}</Typography>
                    <Typography variant="caption">{timeDiff}</Typography>
                </Stack>
                <IconButton>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Stack>
        </Link>
    );
};