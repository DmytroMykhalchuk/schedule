import { deleteTeamMember } from '@/Componets/Add/actions';
import { getUserSessionAndEmail } from '@/Componets/actions';
import { DeleteDialog } from '@/Componets/Common/DeleteDialog';
import { ReactNode } from 'react';

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
            cancelHref={`/${locale}/app/add/team`}
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
        <form action={deleteTeamMember}>
            <input type="hidden" name="auth_email" value={authEmail} />
            <input type="hidden" name="user_id" value={directoryId} />
            {children}
        </form>
    );
};

export default Page;