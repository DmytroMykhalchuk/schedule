import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { addRevenueRecord, getRevenurById, updateRevenue } from '@/app/app/charts/add-revenue/actions';
import { FormRevenue } from '@/app/Componnets/Report/Elements/FormRevenue';
import Typography from '@mui/material/Typography'
import Link from 'next/link';


type PageType = {
    params: {
        id: string
    }
};

const Page: React.FC<PageType> = async ({ params }) => {
    const id = params.id;
    const revenue = await getRevenurById(params.id);

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <FormRevenue formAction={updateRevenue}
                defaultValues={{
                    cost: revenue.cost,
                    date: revenue.targetDate,
                    note: revenue.note,
                }}>
                <input type="hidden" name="revenue_id" value={id} />
                <Link href={'mailto:' + revenue.author.email}>
                    <Stack direction={'row'} mb={2} alignItems={'center'} spacing={2}>
                        <Typography variant="body1">Author: </Typography>
                        <Avatar src={revenue.author.picture} alt={revenue.author.name} sx={{ width: 30, height: 30 }} />
                        <Typography variant="body1" component={'div'}>
                            {revenue.author.name}
                        </Typography>
                    </Stack>
                </Link>
            </FormRevenue>
        </Stack >
    );
};

export default Page;