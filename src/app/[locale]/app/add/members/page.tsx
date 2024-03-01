import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getMembers } from './actions';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const { authEmail } = await getUserSessionAndEmail();

    const users = await getMembers(authEmail);
    return (
        <Stack alignItems={'center'} justifyContent={'center'}>
            <MiddlePaperWrapper pathBack="/app/add" title="Members">
                <Stack spacing={2}>
                    {users.map(user => (
                        <Stack key={user._id.toString()} direction={'row'} spacing={1} alignItems={'center'}>
                            <Avatar src={user.picture} alt={user.name} />
                            <Box flex={1}>
                                <Typography variant="body1">{user.name}</Typography>
                                <Typography variant="caption">{user.email}</Typography>
                            </Box>
                            {
                                user.isAdmin ||
                                <Link href={user._id}>
                                    <DeleteIcon color="warning" />
                                </Link>
                            }
                        </Stack>
                    ))}
                </Stack>
            </MiddlePaperWrapper >
        </Stack >
    );
};

export default Page;