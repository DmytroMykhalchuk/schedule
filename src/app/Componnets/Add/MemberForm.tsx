import styles from '@/app/Componnets/Add/styles.module.scss';
import { UserSelect } from "./Elements/UserSelect";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { defaultFirstUserId, getProjectUsers } from "./actions";

type MemberFormType = {
    action: (formDate: FormData) => Promise<void>
    userId?: string
    role?: string
    isDisabled?: boolean
    buttonConfirmLabel?: string
    requiredUniqueUsers?: boolean
    authEmail: string
};

export const MemberForm: React.FC<MemberFormType> = async ({ userId, role, isDisabled, action, buttonConfirmLabel = 'Confirm', requiredUniqueUsers = false, authEmail }) => {
    const users = await getProjectUsers(requiredUniqueUsers) || [];

    userId || users.unshift({
        _id: defaultFirstUserId,
        name: '-',
        picture: '',
        email: '',
    });

    return (
        <form className={styles.formCreating} action={action}>
            <input type="hidden" name="auth_email" value={authEmail} />
            <UserSelect fieldName="user" showEmail defaultUserId={userId} isDisabled={isDisabled} users={users} />
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
    );
};