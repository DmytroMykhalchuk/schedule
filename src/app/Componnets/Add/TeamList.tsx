import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getTeam } from '@/app/app/add/team/actions';
import { MiddlePaperWrapper } from '@/ui/MiddlePaperWrapper';
import { RecordActions } from '../Common/RecordActions';

type TeamListType = {
};

export const TeamList: React.FC<TeamListType> = async ({ }) => {
    const team = await getTeam();

    return (
        <MiddlePaperWrapper>
            <Stack spacing={2}>
                {
                    team.map(member => (
                        <Stack direction={'row'} key={member.user._id.toString()} spacing={1} alignItems={'center'}>
                            <Avatar src={member.user.picture} alt={member.user.name} />
                            <Stack flex={1}>
                                <Typography variant="body1">{member.user.name}</Typography>
                                <Typography variant="body2">{member.role}</Typography>
                                <Typography variant="caption">{member.user.email}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <RecordActions
                                    editPath={member.user._id.toString()}
                                    deletePath={member.isAdmin ? '' : `${member.user._id}/delete`}
                                />
                            </Stack>
                        </Stack>
                    ))
                }
            </Stack>
        </MiddlePaperWrapper>
    );
};