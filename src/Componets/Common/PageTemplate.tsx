import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type PageTemplateType = {
    title: string;
    content: string;
};

export const PageTemplate: React.FC<PageTemplateType> = ({ title, content }) => {

    return (
        <Container maxWidth='lg' sx={{ pt: 2 }}>
            <Paper sx={{
                borderRadius: 2,
                p: 2,
            }}>
                <Typography variant="h5" mb={1}>{title}</Typography>
                <Typography variant="body1">{content}</Typography>
            </Paper>
        </Container>
    );
};