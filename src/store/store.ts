// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from "react-redux";
import objectsReducer from "./objectsSlice";
import simulationReducer from "./simulationSlice";
import uiReducer from "./uiSlice";
export const store = configureStore({
	reducer: {
		simulation: simulationReducer,
		objects: objectsReducer,
		ui: uiReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
