import { DeleteDialog } from "@/Componets/Common/DeleteDialog";
import { ReactNode } from "react";
import { deleteCategory } from "../../actions";
import { getUserSessionAndEmail } from "@/Componets/actions";

type PageType = {
    params: {
        id: string;
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { locale, id } = params;
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <DeleteDialog
            cancelHref={`/${locale}/app/add/categories`}
            FormWrapper={(props={})=> (<FormWrapper categoryId={id} authEmail={authEmail} {...props}/>)}
        />
    );
};

type FormWrapperType = {
    categoryId: string;
    children?: ReactNode;
    authEmail: string;
};

const FormWrapper: React.FC<FormWrapperType> = ({ children, categoryId, authEmail }) => {
    return (
        <form action={deleteCategory}>
            <input type="hidden" name="auth_email" value={authEmail} />
            <input type="hidden" name="category_id" value={categoryId} />
            {children}
        </form>
    );
};

export default Page;