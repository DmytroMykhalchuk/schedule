import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';
import { ReactNode } from 'react';

type PaginationBarType = {
    total: number,
    limit: number,
    page: number
};

export const PaginationBar: React.FC<PaginationBarType> = ({ total, page, limit }) => {
    const totalPages = Math.ceil(total / limit);
    const prevLink = page === 1 ? undefined : `/app/charts/add-revenue/${page - 1}`;
    const nextLink = page === totalPages ? undefined : `/app/charts/add-revenue/${page + 1}`;

    return (
        <>
            <Stack direction={'row'} justifyContent={'end'}>
                <Paper elevation={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <LinkWrapper link={prevLink} >
                        <Button className={styles.buttonLink} variant="text" disabled={!prevLink}>
                            <KeyboardArrowLeftIcon color='warning' sx={{ fontSize: '2.5em' }} />
                        </Button>
                    </LinkWrapper>
                    <Divider flexItem orientation="vertical" variant="middle" />
                    <LinkWrapper link={nextLink} >
                        <Button  className={styles.buttonLink}variant="text" disabled={!nextLink}>
                            <KeyboardArrowRightIcon color='warning' sx={{ fontSize: '2.5em' }} />
                        </Button>
                    </LinkWrapper>
                </Paper>
            </Stack>
        </>
    );
};

type LinkWrapperType = {
    link?: string,
    children: ReactNode,
};

const LinkWrapper: React.FC<LinkWrapperType> = ({ link, children }) => {
    if (link) {
        return (<Link href={link}> {children} </Link>);
    }
    return (
        <>
            {children}
        </>
    );
};