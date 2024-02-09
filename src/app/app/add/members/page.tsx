import { MiddlePaperWrapper } from "@/ui/MiddlePaperWrapper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import { getMembers } from "./actions";
import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const users = await getMembers();
    return (
        <Stack alignItems={'center'} justifyContent={'center'}>
            <MiddlePaperWrapper pathBacck="/app/add">
                <Typography variant="h5" textAlign={'center'}>Project Members</Typography>

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