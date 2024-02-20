import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography'
import { ReactNode } from "react";

type UIPaperType = {
    title?: string
    children: ReactNode
};

export const UIPaper: React.FC<UIPaperType> = ({ title, children }) => {
    return (
        <Paper sx={{
            borderRadius: 4,
            p: 2,
        }}>
            {title && <Typography variant="h5" fontWeight={600} pb={2}>{title}</Typography>}
            {children}
        </Paper>
    );
};