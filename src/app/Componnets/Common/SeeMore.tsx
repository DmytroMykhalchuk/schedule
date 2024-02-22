import Typography from '@mui/material/Typography';
import Link from 'next/link';

type SeeMoreType = {
    href: string,
    variant?: 'caption' | 'body1' | 'subtitle1' | 'subtitle2',
    color?: string,
    label?: string,
};

export const SeeMore: React.FC<SeeMoreType> = ({ href, variant = 'caption', color = '#ccc', label = 'See more' }) => {

    return (
        <Link href={href}>
            <Typography variant={variant} sx={{ color }}>{label}</Typography>
        </Link>
    );
};