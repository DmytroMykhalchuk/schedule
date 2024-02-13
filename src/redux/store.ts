import appReducer from './app/appReducer';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './task/taskReducer';

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>


export const store = configureStore({
  reducer: {
    app: appReducer,
    task: taskReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStateType = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch