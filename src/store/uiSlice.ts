import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

type ViewMode = "edit" | "simulation";

interface UIState {
	viewMode: ViewMode;
}

const initialState: UIState = {
	viewMode: "edit",
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		switchViewMode: (state, action: PayloadAction<ViewMode>) => {
			state.viewMode = action.payload;
		},

		// Базовый вариант без дополнительных полей
		toggleViewMode: (state) => {
			state.viewMode = state.viewMode === "edit" ? "simulation" : "edit";
		},
	},
});

// Чистый экспорт только нужных actions
export const { switchViewMode, toggleViewMode } = uiSlice.actions;
export default uiSlice.reducer;
