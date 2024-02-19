import { MiddlePaperWrapper } from "@/ui/MiddlePaperWrapper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography'
import styles from '@/app/Componnets/Add/styles.module.scss';
import { generateInvite, getInvitations, removeInvite } from "./actions";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const ivitiations = await getInvitations();

    return (
        <Stack justifyContent={'center'} alignItems={'center'} spacing={2}>
            <MiddlePaperWrapper pathBack="/app/add" title="Invitings">
                <Stack alignItems={'center'} mb={2}>
                    <form className={styles.formCreating} action={generateInvite}>
                        <Button variant="contained" color="warning" sx={{ textTransform: 'none' }} type='submit'>
                            Genereate
                        </Button>
                    </form>
                </Stack>
            </MiddlePaperWrapper>
            <MiddlePaperWrapper>
                <Stack>
                    {
                        ivitiations.map((item, index) => (
                            <Stack direction={'row'} key={index} alignItems={'center'}>
                                <Typography variant="body1" fontWeight={600} flex={1}>{item}</Typography>
                                <form action={removeInvite}>
                                    <input type="hidden" name={'invite'} value={item} />
                                    <IconButton aria-label="delete invite code" type="submit" color='warning'>
                                        <DeleteIcon />
                                    </IconButton>
                                </form>
                            </Stack>
                        ))
                    }
                </Stack>
            </MiddlePaperWrapper>
        </Stack>
    );
};

export default Page;