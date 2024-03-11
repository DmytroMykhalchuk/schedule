import { DeleteDialog } from "@/Componets/Common/DeleteDialog";
import { ReactNode } from "react";
import { deleteDirectory } from "../actions";

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
            cancelHref={`/${locale}/app/add/directories`}
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