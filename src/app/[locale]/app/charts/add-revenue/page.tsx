import { RevenuePage } from '@/Componets/Report/RevenuePage';
import { addRevenueRecord } from './actions';

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {

    return (
        <RevenuePage formAction={addRevenueRecord} />
    );
};

export default Page;