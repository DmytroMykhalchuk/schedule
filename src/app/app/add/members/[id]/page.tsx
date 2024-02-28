import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { removeUser } from '../actions'
import { getUserSessionAndEmail } from '@/app/Componnets/actions'
type PageType = {
    params: { id: string },
};

const Page: React.FC<PageType> = async ({ params }) => {
    const { authEmail } = await getUserSessionAndEmail();

    const id = params.id;
    return (
        <>
            <Dialog open={true} aria-labelledby={'remove member from project'}>
                <DialogTitle>
                    Confirm deleting
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you realy want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link href={'/app/add/members'}>
                        <Button color="warning" sx={{ textTransform: 'none' }}>
                            Cancel
                        </Button>
                    </Link>
                    <form action={removeUser}>
                        <input type="hidden" name="user_id" value={id} />
                        <input type="hidden" name="auth_email" value={authEmail} />
                        <Button variant='contained' color="warning" type='submit' sx={{ textTransform: 'none' }}>
                            Confirm
                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Page;