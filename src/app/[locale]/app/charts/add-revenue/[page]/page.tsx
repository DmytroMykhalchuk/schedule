import { RevenuePage } from "@/Componets/Report/RevenuePage";
import { redirect } from "next/navigation";

type PageType = {
    params: { page: number },
};

const Page: React.FC<PageType> = ({ params }) => {
    const page = +params.page;
    if (isNaN(page)) {
        redirect('/not-found');
    }
    
    return (
        <RevenuePage page={page} />
    );
};

export default Page;