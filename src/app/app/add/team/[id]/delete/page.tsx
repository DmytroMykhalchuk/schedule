import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import { deleteTeamMember } from '@/app/Componnets/Add/actions';

type PageType = {
    params: { id: string }
};

const Page: React.FC<PageType> = ({ params }) => {
    const targetUserId = params.id;

    return (
        <>
            <Dialog open={true}>
                <DialogTitle>
                    Warning!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete this member?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link href={'/app/add/team'}>
                        <Button color="warning" sx={{ textTransform: 'none' }}>
                            Cancel
                        </Button>
                    </Link>
                    <form action={deleteTeamMember}>
                        <input type="hidden" name="user_id" value={targetUserId} />
                        <Button variant='contained' type='submit' color="warning" sx={{ textTransform: 'none' }}>
                            Confirm
                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Page;