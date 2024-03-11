import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type SeeMoreType = {
    href: string,
    variant?: 'caption' | 'body1' | 'subtitle1' | 'subtitle2',
    color?: string,
    label?: string,
};

export const SeeMore: React.FC<SeeMoreType> = ({ href, variant = 'caption', color = '#ccc', label = 'See more' }) => {
const translation = useTranslations('Common');
    return (
        <Link href={href}>
            <Typography variant={variant} sx={{ color }}>{label}</Typography>
        </Link>
    );
};