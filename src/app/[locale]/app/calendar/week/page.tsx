import { CalendarLayout } from "@/Componets/Calendar/CalendarLayout";

type PageType = {
    params: { locale: string };
};

const Page: React.FC<PageType> = ({ params }) => {
    const { locale } = params;

    return (
        <CalendarLayout type="week" locale={locale} />
    );
};

export default Page;