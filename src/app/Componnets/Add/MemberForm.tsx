import { addMember } from "@/app/app/add/team/actions";
import styles from '@/app/Componnets/Add/styles.module.scss';
import { UserSelect } from "./Elements/UserSelect";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type MemberFormType = {
    action: (formDate: FormData) => Promise<void>
    userId?: string
    role?: string
    isDisabled?: boolean
    buttonConfirmLabel?: string
};

export const MemberForm: React.FC<MemberFormType> = ({ userId, role, isDisabled, action, buttonConfirmLabel = 'Confirm' }) => {
    return (
        <>
            <form className={styles.formCreating} action={action}>
                <UserSelect fieldName="user" showEmail defaultUserId={userId} isDisabled={isDisabled} />
                <TextField
                    label="Role"
                    variant="outlined"
                    name="role"
                    defaultValue={role}
                    type="text" size="small" color="warning"
                    sx={{ textAlign: 'center' }}
                    fullWidth
                    inputProps={{ maxLength: 30 }}
                    required
                />
                <Button variant="contained" color="warning" sx={{ textTransform: 'none' }} type='submit'>
                    {buttonConfirmLabel}
                </Button>
            </form>
        </>
    );
};