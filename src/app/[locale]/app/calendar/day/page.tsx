import { CalendarLayout } from "@/Componets/Calendar/CalendarLayout";
import { redirect } from "next/navigation";

type PageType = {
    params: { locale: string };
};

const Page: React.FC<PageType> = ({ params }) => {
    const { locale } = params;

    redirect(`/${locale}/app/my-tasks`)

    return (
        <CalendarLayout type="day" locale={locale} />
    );
};

export default Page;