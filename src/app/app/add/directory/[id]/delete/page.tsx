import { DeleteDialog } from "@/app/Componnets/Common/DeleteDialog";
import { ReactNode } from "react";
import { deleteDirectory } from "../actions";

type PageType = {
    params: { id: string },
};

const Page: React.FC<PageType> = ({ params }) => {
    const { id } = params;

    return (
        <DeleteDialog
            FormWrapper={(props: any) => <FormWrapper directoryId={id} {...props} />}
            cancelHref="/app/add/directory"
            content='It will be deleted completely. Are you sure?'
            title="Confrim action"
        />
    );
};

type FormWrapperType = {
    children?: ReactNode
    directoryId: string
};

const FormWrapper: React.FC<FormWrapperType> = ({ children, directoryId }) => {

    return (
        <form action={deleteDirectory}>
            <input type="hidden" name="directory_id" value={directoryId} />
            {children}
        </form>
    );
};

export default Page;