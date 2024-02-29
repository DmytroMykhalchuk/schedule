import { AppStateType } from "../store";

export const getCounter = (state: AppStateType) => {
    return state.app.value;
};

export const getThemeMode = (state: AppStateType) => {
    return state.app.themeMode;
};