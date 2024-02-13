import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type FormElementDescriptionType = {
    defaultDescription?: string
};

export const FormElementDescription: React.FC<FormElementDescriptionType> = ({ defaultDescription }) => {

    return (
        <>
            <Typography variant="body1" fontWeight={600}>Description</Typography>
            <TextField
                multiline
                minRows={5}
                color='warning'
                name='description'
                defaultValue={defaultDescription}
                sx={{
                    borderWidth: 2,
                    backgroundColor: '#f1f1f1',
                }}
            />
        </>
    );
};