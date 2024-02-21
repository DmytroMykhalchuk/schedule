import { UIPaper } from "@/ui/UIPaper";
import Stack from "@mui/material/Stack";
import { CountCard } from "./Elements/CountCard";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupIcon from '@mui/icons-material/Group';

type CountCardsType = {
};

export const CountCards: React.FC<CountCardsType> = ({ }) => {

    return (
        <Stack direction={'row'} justifyContent={"space-between"} spacing={2}>
            <CountCard
                Icon={<AccountTreeIcon color='warning' />}
                buttonLabel="Add new project"
                colorTheme="warning"
                count={13}
                createUrl="/app/add/directory"
                title="Total projects"
            />
            <CountCard
                Icon={<GroupIcon color='secondary' />}
                buttonLabel="Add new project"
                colorTheme="secondary"
                count={5}
                createUrl="/app/add/directory"
                title="Total projects"
            />
        </Stack>
    );
};