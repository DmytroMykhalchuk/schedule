import Typography from '@mui/material/Typography';

type UIAvarageCaptionType = {
    caption: string,
    fontColor: string,
    backgroundColor: string,
};

export const UIAvarageCaption: React.FC<UIAvarageCaptionType> = ({ caption, fontColor, backgroundColor }) => {

    return (
        <Typography variant="caption" component={'div'}
            sx={{
                px: 1, py: 1,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                color: fontColor,
                backgroundColor: backgroundColor,
                borderRadius: 4,
            }} >

            {caption}
        </Typography>
    );
};