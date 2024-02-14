import Stack from '@mui/material/Stack';
import { addMember } from './actions';
import { MemberForm } from '@/app/Componnets/Add/MemberForm';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TeamList } from '@/app/Componnets/Add/TeamList';

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <MiddlePaperWrapper title='Add member' pathBack='/app/add'>
                <MemberForm action={addMember} />
            </MiddlePaperWrapper>
            <div>
                <TeamList />
            </div>
        </Stack>
    );
};

export default Page;