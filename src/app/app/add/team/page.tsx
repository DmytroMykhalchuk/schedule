import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { addMember } from './actions';
import { MemberForm } from '@/app/Componnets/Add/MemberForm';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TeamList } from '@/app/Componnets/Add/TeamList';

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <MiddlePaperWrapper>
                <Stack direction={'row'} justifyContent={'end'}><Link href={'/app/add'}><CloseIcon /></Link></Stack>
                <Typography variant="h4" textAlign={'center'} mb={2}>Add member</Typography>
                <MemberForm action={addMember} />
            </MiddlePaperWrapper>
            <div>
                <TeamList />
            </div>
        </Stack>
    );
};

export default Page;