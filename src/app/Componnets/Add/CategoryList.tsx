import Stack from "@mui/material/Stack";
import { getCategoriesList } from "./actions";
import Typography from '@mui/material/Typography'
import { RecordActions } from "../Common/RecordActions";

type CategoryListType = {
};

export const CategoryList: React.FC<CategoryListType> = async ({ }) => {
    const categories = await getCategoriesList();

    return (
        <>
            {categories.map(item => (
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography variant="body1" sx={{
                        color: item.textColor,
                        backgroundColor: item.color,
                        flex: 1,
                        p: 1,
                        borderRadius: 2,
                    }}>
                        {item.name}
                    </Typography>
                    <Stack px={1} >
                        <RecordActions
                            deletePath={`${item._id}/delete`}
                            editPath={item._id}
                        />
                    </Stack>
                </Stack>
            ))}
        </>
    );
};