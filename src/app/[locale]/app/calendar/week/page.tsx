import { CalendarLayout } from "@/Componets/Calendar/CalendarLayout";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <CalendarLayout type="week"/>
    );
};

export default Page;