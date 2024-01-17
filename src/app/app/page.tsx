import { ReactNode } from "react";

type PageType = {
    children: ReactNode
};

const Page: React.FC<PageType> = ({ children }) => {
    return (
        <>
            app
        </>
    );
};

export default Page;