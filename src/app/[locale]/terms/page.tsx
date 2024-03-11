import { PageTemplate } from "@/Componets/Common/PageTemplate";
import { useTranslations } from "next-intl";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    const translation = useTranslations('Terms');
    
    return (
        <PageTemplate
            title={translation('title')}
            content={translation('content')}
        />
    );
};

export default Page;