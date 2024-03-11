import { DeleteDialog } from "@/Componets/Common/DeleteDialog";
import { ReactNode } from "react";
import { deleteRevenue } from "../../actions";

type PageType = {
    params: {
        locale: string;
        id: string;
    },
};

const Page: React.FC<PageType> = ({ params }) => {
    const { locale, id } = params;

    return (
        <DeleteDialog
            FormWrapper={(props: any) => <FormWrapper directoryId={id} {...props} />}
            cancelHref={`/${locale}/app/charts/add-revenue`}
        />
    );
};

type FormWrapperType = {
    children?: ReactNode
    directoryId: string
};

const FormWrapper: React.FC<FormWrapperType> = ({ children, directoryId }) => {

    return (
        <form action={deleteRevenue}>
            <input type="hidden" name="revenue_id" value={directoryId} />
            {children}
        </form>
    );
};

export default Page;