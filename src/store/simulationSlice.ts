// features/simulation/simulationSlice.ts
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SimulationState {
	isRunning: boolean;
	startTime: number | null; // timestamp начала
	currentTime: number; // текущее время симуляции в секундах
	duration: number; // общая длительность (сек)
	events: { time: number; action: string }[]; // события по времени
}

const initialState: SimulationState = {
	isRunning: false,
	startTime: null,
	currentTime: 0,
	duration: 300,
	events: [
		{ time: 10, action: "spawn_customer" },
		{ time: 60, action: "check_queue" },
	],
};

export const simulationSlice = createSlice({
	name: "simulation",
	initialState,
	reducers: {
		startSimulation: (state) => {
			state.isRunning = true;
			state.startTime = Date.now();
			state.currentTime = 0;
		},

		stopSimulation: (state) => {
			state.isRunning = false;
		},

		updateTime: (state, action: PayloadAction<number>) => {
			state.currentTime = action.payload;

			// Проверяем события
			// biome-ignore lint/complexity/noForEach: <explanation>
			state.events.forEach((event: { time: number; action: string }) => {
				if (event.time === action.payload) {
					// Здесь можно диспатчить другие actions
					console.log(`Trigger event: ${event.action} at ${event.time}s`);
				}
			});
		},

		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload;
		},
	},
});

export const { startSimulation, stopSimulation, updateTime, setDuration } =
	simulationSlice.actions;
export default simulationSlice.reducer;
