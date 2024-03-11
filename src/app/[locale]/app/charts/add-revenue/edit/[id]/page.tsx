import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormRevenue } from '@/Componets/Report/Elements/FormRevenue';
import { getRevenurById, updateRevenue } from '../../actions';
import { getUserSessionAndEmail } from '@/Componets/actions';

type PageType = {
    params: {
        locale: string;
        id: string;
    }
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { authEmail } = await getUserSessionAndEmail();

    const { locale, id } = params;
    const revenue = await getRevenurById(params.id, authEmail);

    return (
        <Stack alignItems={'center'} justifyContent={'center'} spacing={2}>
            <FormRevenue formAction={updateRevenue}
                defaultValues={{
                    cost: revenue.cost,
                    date: revenue.targetDate,
                    note: revenue.note,
                }}
                authEmail={authEmail}
                locale={locale}
                
            >
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