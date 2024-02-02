import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { cookies } from 'next/headers';
import { MemberForm } from '@/app/Componnets/Add/MemberForm';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TeamActions } from '@/server/actions/TeamActions';
import { updateMember } from '../actions';

const getTeamUser = async (id: string) => {
    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const role = await TeamActions.getTeamMember(projectId, sessionId, id)

    return role;
};

type PageType = {
    params: { id: string }
};

const Page: React.FC<PageType> = async ({ params }) => {
    const targetUserId = params.id;
    const role = await getTeamUser(targetUserId);

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <MiddlePaperWrapper>
                <Stack direction={'row'} justifyContent={'end'}><Link href={'/app/add/team'}><CloseIcon /></Link></Stack>
                <Typography variant="h4" textAlign={'center'} mb={2}>Add member</Typography>
                <MemberForm action={updateMember} isDisabled
                    role={role} userId={targetUserId}
                />
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;