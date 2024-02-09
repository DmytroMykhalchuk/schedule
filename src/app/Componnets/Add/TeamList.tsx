import { TeamActions } from "@/server/actions/TeamActions";
import { MiddlePaperWrapper } from "@/ui/MiddlePaperWrapper";
import { cookies } from "next/headers";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";
import { getAuthParams } from "../actions";

const getTeam = async () => {
    const { projectId, sessionId } = await getAuthParams();

    const team = await TeamActions.getTeam(projectId, sessionId);
    return team;
};

type TeamListType = {
};

export const TeamList: React.FC<TeamListType> = async ({ }) => {
    const team = await getTeam();
    return (
        <MiddlePaperWrapper>
            <Stack spacing={2}>
                {
                    team.map(member => (
                        <Stack direction={'row'} key={member._id} spacing={1} alignItems={'center'}>
                            <Avatar src={member.picture} alt={member.name} />
                            <Stack flex={1}>
                                <Typography variant="body1">{member.name}</Typography>
                                <Typography variant="body2">{member.role}</Typography>
                                <Typography variant="caption">{member.email}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Link href={member._id.toString()}>
                                    <EditIcon color='success' />
                                </Link>
                                {
                                    member.isAdmin ||
                                    <Link href={`${member._id}/delete`}>
                                        <DeleteIcon color="warning" />
                                    </Link>
                                }
                            </Stack>
                        </Stack>
                    ))
                }
            </Stack>
        </MiddlePaperWrapper>
    );
};