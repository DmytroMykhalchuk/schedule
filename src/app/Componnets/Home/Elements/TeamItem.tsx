import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

type TeamItemType = {
    avatar: string,
    name: string,
    role: string,
};

export const TeamItem: React.FC<TeamItemType> = ({ avatar, name, role }) => {

    return (
        <Stack spacing={2}
            alignItems={'center'} justifyContent={'center'}
            sx={{
                py: 3,
                borderRadius: 4,
                bgcolor:'peachy.light'
            }}>
            <Avatar src={avatar} alt={name} />
            <div>
                <Typography variant="caption" textAlign={'center'}>{role}</Typography>
                <Typography variant="subtitle2" textAlign={'center'}>{name}</Typography>
            </div>
        </Stack>
    );
};