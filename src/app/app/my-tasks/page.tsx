import { HeaderLayout } from "@/app/Componnets/Layouts/HeaderLayout";

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {

    return (
        <>
            <HeaderLayout title="My tasks" subtitle="" />
        </>
    );
};

export default Page;