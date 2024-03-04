import { DeleteDialog } from '@/Componets/Common/DeleteDialog';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { ReactNode } from 'react';
import { removeUser } from '../actions';

type PageType = {
    params: {
        id: string;
        locale: string;
    };
};

const Page: React.FC<PageType> = ({ params }) => {
    const { id, locale } = params;

    return (
        <DeleteDialog
            FormWrapper={(props: any) => <FormWrapper directoryId={id} {...props} />}
            cancelHref={`/${locale}/app/add/members`}
        />
    );
};

type FormWrapperType = {
    children?: ReactNode
    directoryId: string
};

const FormWrapper: React.FC<FormWrapperType> = async ({ children, directoryId }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <form action={removeUser}>
            <input type="hidden" name="user_id" value={directoryId} />
            <input type="hidden" name="auth_email" value={authEmail} />
            {children}
        </form>
    );
};

export default Page;