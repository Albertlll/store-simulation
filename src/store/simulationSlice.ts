import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SimulationEventAction =
	| "spawn_customer"
	| "check_queue"
	| "spawn_special_offer"
	| "end_simulation";

export interface SimulationEvent {
	time: number; // Время в секундах
	action: SimulationEventAction;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	payload?: any; // Дополнительные данные события
}

interface HeatmapData {
	[key: string]: number; // "x,y": count
}

interface SimulationState {
	isRunning: boolean;
	startTime: number | null;
	currentTime: number;
	duration: number;
	events: SimulationEvent[];
	heatmapEnabled: boolean;
	heatmapData: HeatmapData;
	maxHeatValue: number;
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
	heatmapEnabled: false,
	heatmapData: {},
	maxHeatValue: 0,
};

export const simulationSlice = createSlice({
	name: "simulation",
	initialState,
	reducers: {
		startSimulation: (state) => {
			state.isRunning = true;
			state.startTime = Date.now();
			state.currentTime = 0;
			state.heatmapData = {};
			state.maxHeatValue = 0;
		},
		stopSimulation: (state) => {
			state.isRunning = false;
		},
		updateTime: (state, action: PayloadAction<number>) => {
			state.currentTime = action.payload;

			// Обработка событий с правильной типизацией
			// biome-ignore lint/complexity/noForEach: <explanation>
			state.events.forEach((event: SimulationEvent) => {
				if (event.time === action.payload) {
					console.log(`Trigger event: ${event.action} at ${event.time}s`);
					// Здесь можно добавить логику для каждого типа события
					switch (event.action) {
						case "spawn_customer":
							// Логика создания посетителя
							break;
						case "check_queue":
							// Проверка очередей
							break;
						default: {
							const exhaustiveCheck = event.action;
							return exhaustiveCheck;
						}
					}
				}
			});
		},
		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload;
		},
		addEvent: (state, action: PayloadAction<SimulationEvent>) => {
			state.events.push(action.payload);
			// Сортируем события по времени
			state.events.sort(
				(a: { time: number }, b: { time: number }) => a.time - b.time,
			);
		},
		removeEvent: (state, action: PayloadAction<number>) => {
			state.events = state.events.filter(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(_: any, index: number) => index !== action.payload,
			);
		},
		toggleHeatmap: (state) => {
			state.heatmapEnabled = !state.heatmapEnabled;
		},
		updateHeatmap: (state, action: PayloadAction<[number, number]>) => {
			const [x, y] = action.payload;
			const key = `${x},${y}`;
			state.heatmapData[key] = (state.heatmapData[key] || 0) + 1;
			if (state.heatmapData[key] > state.maxHeatValue) {
				state.maxHeatValue = state.heatmapData[key];
			}
		},
		resetHeatmap: (state) => {
			state.heatmapData = {};
			state.maxHeatValue = 0;
		},
	},
});

export const {
	startSimulation,
	stopSimulation,
	updateTime,
	setDuration,
	addEvent,
	removeEvent,
	toggleHeatmap,
	updateHeatmap,
	resetHeatmap,
} = simulationSlice.actions;

export default simulationSlice.reducer;
