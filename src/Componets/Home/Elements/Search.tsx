'use client';

import { Box, Collapse, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import useDebounce from "@/utlis/useDebounce";
import styles from './../styles.module.scss';
import { makeSearch } from "../apiCall";
import { SearchAnwserType } from "@/server/types/pageTypes";
import { TagItem } from "./TagItem";
import { ProjectDirectoryItem } from "./ProjectDirectoryItem";
import Link from "next/link";
import { TaskSearch } from "./TaskSearch";
import { CommentSearchItem } from "./CommentSearchItem";
import { UserSearchItem } from "./UserSearchItem";
import { Loader } from "@/Componets/Common/Loader";

type DictionaryType = {
    taskTitle: string;
    directoryTitle: string;
    inviteTitle: string;
    userTitle: string;
    commentTitle: string;
    categoryTitle: string;
    search: string;
    notFound: string;
};

const initSearchResult = {
    tasks: [],
    directories: [],
    users: [],
    comments: [],
    categories: [],
    invitations: [],
};

type SearchType = {
    dictionary: DictionaryType;
    authEmail: string;
    locale: string;
};

export const Search: React.FC<SearchType> = ({ dictionary, authEmail, locale }) => {
    const [isFetching, setIsFetching] = useState(false);
    const [searchResult, setSearchResult] = useState<SearchAnwserType>(initSearchResult)
    const [searchInput, setSearchInput] = useState('');

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.currentTarget.value;
        setSearchInput(text);
    };

    const targetSearch = useDebounce(searchInput);

    useEffect(() => {

        if (!targetSearch.length) {
            setSearchResult(initSearchResult);
            return;
        }

        sendRequest();


    }, [targetSearch]);

    const sendRequest = async () => {
        setIsFetching(true);
        const response = await makeSearch(searchInput, authEmail);

        if (response?.code === 200) {
            setSearchResult(response.data);
        }
        setIsFetching(false);
    }


    return (
        <Box className={styles.searchWrapper} flex={1} bgcolor={'secondary'}>
            <FormControl variant="outlined" fullWidth color="warning" sx={{
                backgroundColor: 'background.paper',
                maxWidth: 380,
                position: 'relative',
            }}>
                <InputLabel>{dictionary.search}</InputLabel>
                <OutlinedInput
                    className={styles.searchWrapper__input}
                    type={'text'}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    value={searchInput}
                    onChange={onChangeSearch}
                    label="Search"
                />
                <Collapse className={styles.searchWrapper__dataSearch} in={searchInput.length > 0}>
                    <Paper className={styles.content}>
                        {isFetching
                            ? <Stack alignItems={'center'} justifyContent={'center'}><Loader /></Stack>
                            : <SearchAnswer searchResult={searchResult} dictionary={dictionary} locale={locale} />
                        }

                    </Paper>
                </Collapse>
            </FormControl>
        </Box >
    );
};

type SearchAnswerType = {
    searchResult: SearchAnwserType;
    dictionary: DictionaryType;
    locale: string;
};

const SearchAnswer: React.FC<SearchAnswerType> = ({ searchResult, dictionary, locale }) => {
    if (
        searchResult.categories.length === 0
        && searchResult.directories.length === 0
        && searchResult.tasks.length === 0
        && searchResult.invitations.length === 0
        && searchResult.comments.length === 0
        && searchResult.users.length === 0
    ) {
        return (
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Typography variant="subtitle1">{dictionary.notFound}</Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={2}>
            {
                searchResult.categories.length > 0 && (
                    <Box>
                        <Typography variant="h6">{dictionary.categoryTitle}</Typography>
                        <Stack spacing={1}>
                            {
                                searchResult.categories.map(category => (
                                    <TagItem
                                        key={category._id}
                                        categoryId={category._id}
                                        colorPrimary={category.textColor}
                                        colorSecondary={category.color}
                                        name={category.name}
                                        tag={category.name}
                                    />
                                ))
                            }
                        </Stack>
                    </Box>
                )
            }
            {
                searchResult.directories.length > 0 && (
                    <Box>
                        <Typography variant="h6">{dictionary.directoryTitle}</Typography>
                        {
                            searchResult.directories.map(directory => (
                                <ProjectDirectoryItem
                                    key={directory._id}
                                    title={directory.name}
                                    users={[]}
                                    id={directory._id.toString()}
                                    locale={locale}
                                />
                            ))
                        }
                    </Box>
                )
            }
            {
                searchResult.tasks.length > 0 && (
                    <Box>
                        <Typography variant="h6">{dictionary.taskTitle}</Typography>
                        <Stack spacing={1}>
                            {
                                searchResult.tasks.map(task => (
                                    <TaskSearch key={task.taskId} locale={locale} task={task} />
                                ))
                            }
                        </Stack>
                    </Box>
                )
            }
            {
                searchResult.invitations.length > 0 && (
                    <Box>
                        <Typography variant="h6">{dictionary.inviteTitle}</Typography>
                        <Stack spacing={1}>
                            {
                                searchResult.invitations.map((code, index) => (
                                    <Typography variant="body1" key={index}>{code}</Typography>
                                ))
                            }
                        </Stack>
                    </Box>
                )
            }
            {
                searchResult.comments.length > 0 && (
                    <Box>
                        <Typography variant="h6">{dictionary.commentTitle}</Typography>
                        <Stack spacing={1}>
                            {
                                searchResult.comments.map((comment, index) => (
                                    <CommentSearchItem
                                        key={index}
                                        comment={comment}
                                        locale={locale}
                                    />
                                ))
                            }
                        </Stack>
                    </Box>
                )
            }
            {
                searchResult.users.length > 0 && (
                    <Box>
                        <Typography variant="h6">{dictionary.userTitle}</Typography>
                        <Stack spacing={1}>
                            {
                                searchResult.users.map((user, index) => (
                                    <UserSearchItem
                                        key={index}
                                        user={user}
                                    />
                                ))
                            }
                        </Stack>
                    </Box>
                )
            }
        </Stack>
    );
};
