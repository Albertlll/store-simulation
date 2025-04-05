// features/objects/objectsSlice.ts
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { SceneObject, SceneObjectType } from "../types/scene";

interface ObjectsState {
	items: SceneObject[];
}

const initialState: ObjectsState = {
	items: [],
};

export const objectsSlice = createSlice({
	name: "objects",
	initialState,
	reducers: {
		addObject: (state, action: PayloadAction<SceneObject>) => {
			state.items.push(action.payload);
		},
		updateObject: (state, action: PayloadAction<SceneObject>) => {
			const index = state.items.findIndex(
				(obj: SceneObject) => obj.id === action.payload.id,
			);
			if (index !== -1) {
				state.items[index] = action.payload;
			}
		},
		removeObject: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(
				(obj: SceneObject) => obj.id !== action.payload,
			);
		},
	},
});

export const { addObject, updateObject, removeObject } = objectsSlice.actions;
export default objectsSlice.reducer;
