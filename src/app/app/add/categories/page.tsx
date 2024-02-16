import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { categoryColors } from '@/server/constants';
import { createCategory } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { UIInputField } from '@/app/Componnets/UI/UIInputField';
import { CategoryList } from '@/app/Componnets/Add/CategoryList';
import { CategoryForm } from '@/app/Componnets/Add/CategoryForm';

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <Stack spacing={2} alignItems={'center'} justifyContent={'center'}>
            <MiddlePaperWrapper pathBack="/app/add/" title="Add category">
                <form action={createCategory}>
                    <CategoryForm/>
                </form>
            </MiddlePaperWrapper>
            <MiddlePaperWrapper>
                <Stack spacing={2}>
                    <CategoryList />
                </Stack>
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;