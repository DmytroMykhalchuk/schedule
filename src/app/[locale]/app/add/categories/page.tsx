import Stack from '@mui/material/Stack';
import { CategoryForm } from '@/Componets/Add/CategoryForm';
import { CategoryList } from '@/Componets/Add/CategoryList';
import { createCategory } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { getUserSessionAndEmail } from '@/Componets/actions';

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