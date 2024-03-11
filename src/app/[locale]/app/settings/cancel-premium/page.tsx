import { cancelPremium, getHasPremium } from '../actions';
import { DeleteDialog } from '@/Componets/Common/DeleteDialog';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

type PageType = {
    params: {
        locale: string;
    }
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { authEmail } = await getUserSessionAndEmail();
    const { locale } = params;

    const info = await getHasPremium(authEmail);

    if (!info.hasPremium) {
        return notFound();
    }

    return (
        <Content locale={locale} authEmail={authEmail} />
    );
};

type ContentType = {
    locale: string;
    authEmail: string;
};

export const Content: React.FC<ContentType> = ({ locale, authEmail }) => {
    const translation = useTranslations("Premium");
    return (
        <DeleteDialog
            cancelHref={`/${locale}/app/settings`}
            FormWrapper={(props = {}) => (<FormWrapper authEmail={authEmail} {...props} />)}
            title={translation('cancel_premium')}
            content={translation('cancle_warning')}
        />
    );
};

type FormWrapperType = {
    authEmail: string;
    children?: ReactNode
};

export const FormWrapper: React.FC<FormWrapperType> = async ({ children, authEmail }) => {

    return (
        <form action={cancelPremium}>
            <input type="hidden" name="auth_email" value={authEmail} />
            {children}
        </form>
    );
};


export default Page;