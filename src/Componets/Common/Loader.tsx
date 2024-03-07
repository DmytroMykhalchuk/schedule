import CircularProgress from "@mui/material/CircularProgress";

type LoaderType = {
};

export const Loader: React.FC<LoaderType> = ({ }) => {

    return (
        <CircularProgress color="warning" />
    );
};