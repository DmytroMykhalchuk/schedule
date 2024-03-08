import { RevenuePage } from '@/Componets/Report/RevenuePage';
import { addRevenueRecord } from './actions';

type PageType = {
    params: {
        locale: string;
    };
    searchParams: {
        created_id?: string;
    }
};

const Page: React.FC<PageType> = ({ params, searchParams }) => {
    const { locale } = params;
    const { created_id: createdId } = searchParams;

    return (
        <RevenuePage formAction={addRevenueRecord} locale={locale} createdId={createdId} />
    );
};

export default Page;