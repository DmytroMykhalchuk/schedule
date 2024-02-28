import { DeleteDialog } from "@/app/Componnets/Common/DeleteDialog";
import { ReactNode } from "react";
import { deleteCategory } from "../../actions";
import { getUserSessionAndEmail } from "@/app/Componnets/actions";

type PageType = {
    params: { id: string }
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { id } = params;

    return (
        <DeleteDialog
            cancelHref="/app/add/categories"
            content='It will be deleted completely. Are you sure?'
            title="Confrim action"
            FormWrapper={(props = {}) => (<FormWrapper categoryId={id} {...props} />)}
        />
    );
};

type FormWrapperType = {
    categoryId: string
    children?: ReactNode
};

export const FormWrapper: React.FC<FormWrapperType> = async ({ children, categoryId }) => {
    const { authEmail } = await getUserSessionAndEmail();

    return (
        <form action={deleteCategory}>
            <input type="hidden" name="auth_email" value={authEmail} />
            <input type="hidden" name="category_id" value={categoryId} />
            {children}
        </form>
    );
};

export default Page;