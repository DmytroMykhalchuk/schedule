import Stack from '@mui/material/Stack';
import { CategoryForm } from '@/Componets/Add/CategoryForm';
import { getCategoryById, updateCategory } from '../actions';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { notFound } from 'next/navigation';
import { CategoryRecord } from '@/server/actions/types';
import { useTranslations } from 'next-intl';

type PageType = {
    params: {
        id: string;
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale, id } = params;
    const { authEmail } = await getUserSessionAndEmail();

    const category = await getCategoryById(id, authEmail);

    if (!category) {
        return notFound();
    }

    return (
        <Stack spacing={2} alignItems={'center'} justifyContent={'center'}>
            <Content authEmail={authEmail} category={category} locale={locale} />
        </Stack>
    );
};

type ContentType = {
    authEmail: string;
    category: CategoryRecord;
    locale: string;
};

export const Content: React.FC<ContentType> = ({ authEmail, category, locale }) => {
    const translation = useTranslations('Form');

    return (
        <MiddlePaperWrapper
            pathBack={`/${locale}/app/add/categories`}
            title={translation('category_form.update_title')}
        >
            <form action={updateCategory}>
                <input type="hidden" name="auth_email" value={authEmail} />
                <input type="hidden" name="category_id" value={category?._id.toString()} />
                <CategoryForm
                    color={category?.color}
                    name={category?.name}
                />
            </form>
        </MiddlePaperWrapper>
    );
};

export default Page;