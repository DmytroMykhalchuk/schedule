import Stack from '@mui/material/Stack';
import { CategoryForm } from '@/Componets/Add/CategoryForm';
import { CategoryList } from '@/Componets/Add/CategoryList';
import { createCategory } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { useTranslations } from 'next-intl';
import { getCategoriesList } from '@/Componets/Add/actions';

type PageType = {
    params: {
        locale: string;
    };
    searchParams: {
        category_id?: string;
    };
};

const Page: React.FC<PageType> = async ({ params, searchParams }) => {
    const { locale } = params;
    const { category_id: categoryId } = searchParams;

    const { authEmail } = await getUserSessionAndEmail();
    const categories = await getCategoriesList(authEmail);

    return (
        <Stack spacing={2} alignItems={'center'} justifyContent={'center'}>
            <div>
                <Content authEmail={authEmail} locale={locale} categoriesCount={categories?.length || 0} />
            </div>
            <MiddlePaperWrapper>
                <div>
                    <CategoryList categories={categories} />
                </div>
            </MiddlePaperWrapper>
        </Stack>
    );
};

type ContentType = {
    authEmail: string;
    locale: string;
    categoriesCount: number;
};

const Content: React.FC<ContentType> = ({ authEmail, locale, categoriesCount }) => {
    const translation = useTranslations('Form');
    return (
        <MiddlePaperWrapper pathBack={`/${locale}/app/add/`} title={translation('category_form.add_title')}>
            <form action={createCategory}>
                <input type="hidden" name="auth_email" value={authEmail} />
                <CategoryForm categoriesCount={categoriesCount} />
            </form>
        </MiddlePaperWrapper>
    );
};

export default Page;