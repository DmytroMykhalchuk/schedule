import { UIPaper } from "@/ui/UIPaper";
import Stack from "@mui/material/Stack";
import { CountCard } from "./Elements/CountCard";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupIcon from '@mui/icons-material/Group';

type CountCardsType = {
    directoriesCount?: number,
    usersCount?: number,
};

export const CountCards: React.FC<CountCardsType> = ({ directoriesCount = 0, usersCount = 0 }) => {

    return (
        <Stack direction={'row'} justifyContent={"space-between"} spacing={2}>
            <CountCard
                Icon={<AccountTreeIcon color='warning' />}
                buttonLabel="Add new project"
                colorTheme="warning"
                count={directoriesCount}
                createUrl="/app/add/directory"
                title="Total projects"
            />
            <CountCard
                Icon={<GroupIcon color='secondary' />}
                buttonLabel="Add new user"
                colorTheme="secondary"
                count={usersCount}
                createUrl="/app/add/users"
                title="Total users"
            />
        </Stack>
    );
};