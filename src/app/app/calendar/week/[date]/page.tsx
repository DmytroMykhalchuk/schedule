import { CalendarLayout } from "@/app/Componnets/Calendar/CalendarLayout";

type PageType = {
    params: { date: string }
};

const Page: React.FC<PageType> = ({ params }) => {
    const date = params.date;

    return (
        <CalendarLayout type="week" date={date}/>
    );
};

export default Page;