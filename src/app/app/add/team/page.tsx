import Stack from '@mui/material/Stack';
import { addMember } from './actions';
import { MemberForm } from '@/app/Componnets/Add/MemberForm';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { TeamList } from '@/app/Componnets/Add/TeamList';
import { getUserSessionAndEmail } from '@/app/Componnets/actions';

type PageType = {
};

const Page: React.FC<PageType> = async({ }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <MiddlePaperWrapper title='Add team member' pathBack='/app/add'>
                <div>
                    <MemberForm action={addMember} requiredUniqueUsers authEmail={authEmail} />
                </div>
            </MiddlePaperWrapper>
            <div>
                <TeamList authEmail={authEmail}/>
            </div>
        </Stack>
    );
};

export default Page;