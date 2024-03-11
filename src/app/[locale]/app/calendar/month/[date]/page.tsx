import { CalendarLayout } from "@/Componets/Calendar/CalendarLayout";

type PageType = {
    params: { date: string, locale: string, };
};

const Page: React.FC<PageType> = ({ params }) => {
    const { date, locale } = params;

    return (
        <>
            <CalendarLayout type="month" date={date} locale={locale} />
        </>
    );
};

export default Page;