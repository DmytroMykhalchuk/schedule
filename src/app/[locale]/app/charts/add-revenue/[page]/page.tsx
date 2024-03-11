import { RevenuePage } from "@/Componets/Report/RevenuePage";
import { notFound, redirect } from "next/navigation";
import { addRevenueRecord } from "../actions";

type PageType = {
    params: {
        locale: string;
        page: number;
    },
};
//todo page params provide to search params
const Page: React.FC<PageType> = ({ params }) => {
    const { locale } = params;

    const page = +params.page;
    if (isNaN(page)) {
        return notFound();
    }

    return (
        <RevenuePage
            page={page || undefined}
            formAction={addRevenueRecord}
            locale={locale}
        />
    );
};

export default Page;