'use client';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ThemeMode } from './appTypes'
import { theme } from '@/app/theme/theme'

export interface CounterState {
    value: number,
    themeMode: ThemeMode,
}

const initialState: CounterState = {
    value: 0,
    themeMode: 'light',
    // themeMode: 'dark',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<{ id: number, msg?: string }>) => {
            state.value += action.payload.id
        },
        toggleTheme: (state) => {
            const currentTheme = localStorage.getItem('themeMode') as ThemeMode;
            const theme = currentTheme === 'light' ? 'dark' : 'light';
            state.themeMode = theme;
            localStorage.setItem('themeMode', theme);
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, toggleTheme } = appSlice.actions

export default appSlice.reducer;