import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type FormElementDescriptionType = {
    defaultDescription?: string;
    translatedName: string;
};

export const FormElementDescription: React.FC<FormElementDescriptionType> = ({ defaultDescription, translatedName }) => {

    return (
        <>
            <Typography variant="body1" fontWeight={600}>{translatedName}</Typography>
            <TextField
                multiline
                minRows={5}
                color='warning'
                name='description'
                defaultValue={defaultDescription}
                sx={{
                    borderWidth: 2,
                    backgroundColor: 'peachy.main',
                    borderRadius: 4,
                    "& .MuiInputBase-root": {
                        borderRadius: 4,
                    },
                }}
            />
        </>
    );
};