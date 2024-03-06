'use client';
import Typography from '@mui/material/Typography';
import styles from './../styles.module.scss';

type CopyElementType = {
    variant?: 'body1';
    fontWeight?: 600;
    label: string;
};

export const CopyElement: React.FC<CopyElementType> = ({ fontWeight = '600', variant = 'body1', label }) => {

    return (
        <Typography
            className={styles.copyItem}
            variant={variant}
            fontWeight={fontWeight}
            flex={1}
            onClick={() => { navigator.clipboard.writeText(label) }}
            sx={{

            }}
        >{label}</Typography>
    );
};