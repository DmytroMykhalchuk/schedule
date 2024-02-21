import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from "react";

type UIPaperType = {
    title?: string
    children?: ReactNode
    titleSlot?: ReactNode
};

export const UIPaper: React.FC<UIPaperType> = ({ title, titleSlot, children }) => {
    return (
        <Paper sx={{
            borderRadius: 4,
            p: 2,
            width:'100%',
        }}>
            {
                (title || titleSlot) &&
                <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                    {title
                        ? <Typography variant="h5" fontWeight={600} pb={2}>{title}</Typography>
                        : <div style={{ flex: 1 }} />
                    }
                    {titleSlot && titleSlot}
                </Stack>
            }
            
            {children}
        </Paper>
    );
};