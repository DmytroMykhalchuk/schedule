import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupIcon from '@mui/icons-material/Group';
import Stack from '@mui/material/Stack';
import { CountCard } from './Elements/CountCard';
import { useTranslations } from 'next-intl';

type CountCardsType = {
    directoriesCount?: number;
    usersCount?: number;
    locale: string;
};

export const CountCards: React.FC<CountCardsType> = ({ directoriesCount = 0, usersCount = 0, locale }) => {
    const translation = useTranslations('Report');

    return (
        <Stack direction={'row'} justifyContent={"space-between"} spacing={2}>
            <CountCard
                Icon={<AccountTreeIcon color='warning' />}
                buttonLabel={translation(`total_projects.add_button`)}
                colorTheme="warning"
                count={directoriesCount}
                createUrl={`/${locale}/app/add/directories`}
                title={translation(`total_projects.title`)}
            />
            <CountCard
                Icon={<GroupIcon color='secondary' />}
                buttonLabel={translation(`total_users.add_button`)}
                colorTheme="secondary"
                count={usersCount}
                createUrl={`/${locale}/app/add/users`}
                title={translation(`total_users.title`)}
            />
        </Stack>
    );
};