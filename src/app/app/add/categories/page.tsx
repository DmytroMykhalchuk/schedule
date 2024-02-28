import Stack from '@mui/material/Stack';
import { CategoryForm } from '@/app/Componnets/Add/CategoryForm';
import { CategoryList } from '@/app/Componnets/Add/CategoryList';
import { createCategory } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { getUserSessionAndEmail } from '@/app/Componnets/actions';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack spacing={2} alignItems={'center'} justifyContent={'center'}>
            <MiddlePaperWrapper pathBack="/app/add/" title="Add category">
                <form action={createCategory}>
                    <input type="hidden" name="auth_email" value={authEmail} />
                    <CategoryForm />
                </form>
            </MiddlePaperWrapper>
            <MiddlePaperWrapper>
                <div>
                    <CategoryList authEmail={authEmail} />
                </div>
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;