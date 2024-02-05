import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import styles from './../styles.module.scss';
import AddIcon from '@mui/icons-material/Add';

type TeamItemType = {
    avatar: string,
    name: string,
    role: string,
    email: string,
    isAaddItem?: boolean
};

export const TeamItem: React.FC<TeamItemType> = ({ avatar, name, role, email, isAaddItem }) => {

    return (
        <Stack spacing={2}
            alignItems={'center'} justifyContent={'center'}
            sx={{
                py: 3,
                borderRadius: 4,
                bgcolor: 'peachy.light',
                height: '100%',
            }}>
            {isAaddItem ? <AddIcon /> : <Avatar src={avatar} alt={name} />}
            <Stack sx={{ flex: 1, width: '100%',px:1 }}>
                <Typography className={styles.truncate} variant="caption" textAlign={'center'}>{role}</Typography>
                <Typography className={styles.truncate} variant="body1" textAlign={'center'}>{name}</Typography>
                {email &&
                    <Stack sx={{ flex: 1, textAlign: 'center', fontSize: '0.85em' }} justifyContent={'center'}>
                        <a className={styles.truncate} href={`mailto:${email}`}>
                            {email}
                        </a>
                    </Stack>
                }
            </Stack>
        </Stack>
    );
};