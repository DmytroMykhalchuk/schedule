import { CalendarLayout } from "@/app/Componnets/Calendar/CalendarLayout";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <CalendarLayout type="day"/>
    );
};

export default Page;