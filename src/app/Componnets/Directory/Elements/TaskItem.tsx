import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import styles from './../styles.module.scss';
import Typography from '@mui/material/Typography';
import { ByDirectoryTaskRecord } from '@/server/actions/types';
import { priorityStyling } from '@/server/constants';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
type TaskItemType = {
    task: ByDirectoryTaskRecord
};

export const TaskItem: React.FC<TaskItemType> = ({ task }) => {

    return (
        <Link href={'/app/add/task/' + task._id}>
            <Box sx={{
                backgroundColor: task.category?.color,
                color: task.category?.textColor,
                p: 1,
                borderRadius: 4,
                cursor: 'pointer',
                '&:hover': {
                    opacity: 0.7,
                },
            }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
                    <Typography className={styles.truncate} variant="h6" fontWeight={600}>{task.name}</Typography>
                    <Chip variant="outlined" label={`#${task.category?.name}`} />
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                    <Box width={12} height={12} borderRadius={'50%'} bgcolor={priorityStyling[task.priority].primaryColor} />
                    <Typography variant="subtitle2">{task.priority}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Link href={'mailto:' + task.assignee.email}>
                        <Avatar alt="Remy Sharp" src={task.assignee.picture} sx={{ width: 30, height: 30, }} />
                    </Link>
                    <Box>
                        <IconButton>
                            <MoreHorizIcon />
                        </IconButton>
                        <IconButton>
                            <ChatBubbleIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </Box>
        </Link>
    );
};

