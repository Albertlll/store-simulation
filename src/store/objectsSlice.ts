// features/objects/objectsSlice.ts
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { SceneObject } from "../types/scene";

interface ObjectsState {
	items: SceneObject[];
	selectedId: number | null;
}

const initialState: ObjectsState = {
	items: [],
	selectedId: null,
};

export const objectsSlice = createSlice({
	name: "objects",
	initialState,
	reducers: {
		addObject: (state, action: PayloadAction<SceneObject>) => {
			state.items.push(action.payload);
		},
		selectObject: (state, action: PayloadAction<number | null>) => {
			state.selectedId = action.payload;
		},
		updateObject: (
			state,
			action: PayloadAction<Partial<SceneObject> & { id: number }>,
		) => {
			const index = state.items.findIndex(
				(obj: SceneObject) => obj.id === action.payload.id,
			);
			if (index !== -1) {
				state.items[index] = { ...state.items[index], ...action.payload }; // Мерджим изменения!
			}
		},
		removeObject: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(
				(obj: SceneObject) => obj.id !== action.payload,
			);
		},
	},
});

export const { addObject, updateObject, removeObject, selectObject } =
	objectsSlice.actions;

export const selectSelectedObject = (state: { objects: ObjectsState }) => {
	return state.objects.items.find((obj) => obj.id === state.objects.selectedId);
};
export default objectsSlice.reducer;
