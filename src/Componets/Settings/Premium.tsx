import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography'
import { initPayment } from "@/app/[locale]/app/settings/actions";
import { useTranslations } from "next-intl";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";

type PremiumType = {
    isActive: boolean;
};

export const Premium: React.FC<PremiumType> = ({ isActive }) => {
    const translation = useTranslations('Premium');

    if (isActive) {
        return (
            <Stack p={2}>
                <Link href={'cancel-premium'}>
                    <Stack direction={'row'} alignItems={'center'}>
                        <Typography variant="h6" flex={1}>{translation('cancel_premium')}</Typography>
                        <ArrowForwardIosIcon />
                    </Stack>
                </Link>
            </Stack>
        );
    }

    return (
        <Stack p={2}>
            <form action={initPayment}>
                <Stack direction={'row'}
                    alignItems={'center'}
                    component={'button'} type='submit'
                    sx={{
                        background: 'transparent',
                        borderRadius: 4,
                        width: '100%',
                        cursor: 'pointer',
                        borderColor: 'fpage.main',
                        color: 'fpage.main',
                    }}
                    p={2}
                >
                    <Stack alignItems={'start'} p={2} flex={1}>
                        <Typography variant="h6" fontWeight={600}>{translation('premium')}</Typography>
                        <Typography variant="subtitle1" textAlign={'start'}>
                            {translation('preference_text')}
                        </Typography>
                    </Stack>
                    <ArrowForwardIosIcon />
                </Stack>
                <Typography p={2} variant="subtitle1" color={'secondary'}>For testing you can use any stripe test card. For exmaple: 4242 4242 4242 4242 with any other paramters </Typography>
            </form>
        </Stack>
    );
};