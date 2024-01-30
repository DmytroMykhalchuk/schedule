import Paper from "@mui/material/Paper";
import { ReactNode } from "react";

type MiddlePaperWrapperType = {
    children?: ReactNode
};

export const MiddlePaperWrapper: React.FC<MiddlePaperWrapperType> = ({ children }) => {

    return (
        <Paper sx={{
            p: 2,
            borderRadius: 4,
            minWidth: { xs: 320, md: 600 },
            backgroundColor: 'background.paper',
        }}>
            {children}
        </Paper>
    );
};