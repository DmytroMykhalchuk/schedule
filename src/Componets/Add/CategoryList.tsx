import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography'
import { RecordActions } from "../Common/RecordActions";
import { CategoryRecord } from "@/server/actions/types";

type CategoryListType = {
    categories: CategoryRecord[];
};

export const CategoryList: React.FC<CategoryListType> = async ({ categories }) => {

    return (
        <Stack spacing={2}>
            {categories.map(item => (
                <div key={item._id}>
                    <Stack key={item._id} direction={'row'} alignItems={'center'}>
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
                </div>
            ))}
        </Stack>
    );
};