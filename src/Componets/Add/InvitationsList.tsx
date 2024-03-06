
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { removeInvite } from "@/app/[locale]/app/add/invitations/actions";
import { CopyElement } from './Elements/CopyElement';

type InvitationsListType = {
    authEmail: string;
    ivitiations: string[];
};

export const InvitationsList: React.FC<InvitationsListType> = ({ authEmail, ivitiations }) => {
    return (
        <Stack>
            {
                ivitiations.map((invite, index) => (
                    <Stack direction={'row'} key={index} alignItems={'center'}>
                        <CopyElement label={invite} />
                        <form action={removeInvite}>
                            <input type="hidden" name="auth_email" value={authEmail} />
                            <input type="hidden" name={'invite'} value={invite} />
                            <IconButton aria-label="delete invite code" type="submit" color='warning'>
                                <DeleteIcon />
                            </IconButton>
                        </form>
                    </Stack>
                ))
            }
        </Stack>
    );
};