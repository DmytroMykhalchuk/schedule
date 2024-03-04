import Stack from '@mui/material/Stack';
import { CategoryForm } from '@/Componets/Add/CategoryForm';
import { CategoryList } from '@/Componets/Add/CategoryList';
import { createCategory } from './actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { useTranslations } from 'next-intl';

type PageType = {
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale } = params;
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <Stack spacing={2} alignItems={'center'} justifyContent={'center'}>
            <Content authEmail={authEmail} locale={locale} />
            <MiddlePaperWrapper>
                <div>
                    <CategoryList authEmail={authEmail} />
                </div>
            </MiddlePaperWrapper>
        </Stack>
    );
};

type ContentType = {
    authEmail: string;
    locale: string;
};

export const Content: React.FC<ContentType> = ({ authEmail, locale }) => {
    const translation = useTranslations('Form');
    return (
        <MiddlePaperWrapper pathBack={`/${locale}/app/add/`} title={translation('category_form.add_title')}>
            <form action={createCategory}>
                <input type="hidden" name="auth_email" value={authEmail} />
                <CategoryForm />
            </form>
        </MiddlePaperWrapper>
    );
};

export default Page;