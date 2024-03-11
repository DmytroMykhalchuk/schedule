import { useTranslations } from "next-intl";
import Typography from '@mui/material/Typography'

type PaperTitleType = {
    titleKey: string,
    pageName: string
};

export const PaperTitle: React.FC<PaperTitleType> = ({ pageName, titleKey }) => {
    const translation = useTranslations(pageName);
    return (
        <Typography variant="h6">{translation(titleKey)}</Typography>
    );
};