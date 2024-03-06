import { RevenuePage } from '@/Componets/Report/RevenuePage';
import { addRevenueRecord } from './actions';

type PageType = {
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = ({ params }) => {
    const { locale } = params;
    return (
        <RevenuePage formAction={addRevenueRecord} locale={locale} />
    );
};

export default Page;