import {createReducer, updateState} from "./utility";

export const initialUiState = {
    mobileOpen: false,
    zoom: 1,
};

const toggleMenu = (state, action) => updateState(state, { mobileOpen: !state.mobileOpen });

const handlers = {
    TOGGLE_MENU: toggleMenu,
};

export const uiReducer = createReducer(initialUiState, handlers);