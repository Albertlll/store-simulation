import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { resetHeatmap } from "./simulationSlice";

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

// Дополнительный action creator для переключения с reset
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const toggleViewModeWithReset = () => (dispatch: any) => {
	dispatch(uiSlice.actions.toggleViewMode());
	dispatch(resetHeatmap());
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const switchViewModeWithReset = (mode: ViewMode) => (dispatch: any) => {
	dispatch(uiSlice.actions.switchViewMode(mode));
	dispatch(resetHeatmap());
};

// Чистый экспорт только нужных actions
export const { switchViewMode, toggleViewMode } = uiSlice.actions;
export default uiSlice.reducer;
