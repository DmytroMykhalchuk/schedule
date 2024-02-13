import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    taskForm: {
        assignee: null as null | string,
    },
};

export const appSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTaskFormAssignee(state, action: PayloadAction<{ assignee: string }>) {
            state.taskForm.assignee = action.payload.assignee;
        },
    },
})

export const { setTaskFormAssignee } = appSlice.actions

export default appSlice.reducer;