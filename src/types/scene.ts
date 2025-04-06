export type SceneObjectType =
	| "cashRegister"
	| "shelf"
	| "refrigerator"
	| "character";

export interface SceneObject {
	id: number;
	type: SceneObjectType;
	position: [number, number, number]; // [x, y, z]
	rotation: number; // Угол поворота в градусах (0-360)
	gridPosition: [number, number]; // [col, row]
	isDragging?: boolean;
	visible?: boolean;
}

// Специфичные типы объектов
export interface Character extends SceneObject {
	type: "character";
	speed: number;
	rotation: number; // Обязательный для персонажа
}

export interface Shelf extends SceneObject {
	type: "shelf";
	capacity: number;
	productType: ProductType;
}

export interface Refrigerator extends SceneObject {
	type: "refrigerator";
	temperature: number;
	isOpen: boolean;
	rotation: number; // Холодильник тоже может поворачиваться
}

export interface CashRegister extends SceneObject {
	type: "cashRegister";
}

export type StoreObject = Character | Shelf | Refrigerator | CashRegister;

// Константы сетки
export const GRID_SIZE = 20;
export const CELL_SIZE = 1;
export const GRID_OFFSET = (GRID_SIZE * CELL_SIZE) / 2;

// types/scene.ts
export enum ProductType {
	BUTTER = "BUTTER",
	FLOUR = "FLOUR",
	SUGAR = "SUGAR",
	BREAD = "BREAD",
	WINE = "WINE",
	COLD_DRINKS = "COLD_DRINKS",
	FISH = "FISH",
	SAUSAGES = "SAUSAGES",
	DAIRY = "DAIRY",
	MEAT_PRODUCTS = "MEAT_PRODUCTS",
	SPICES = "SPICES",
	SEEDS = "SEEDS",
	SNACKS = "SNACKS",
	DESSERTS = "DESSERTS",
	PET_FOOD = "PET_FOOD",
	HOUSEHOLD = "HOUSEHOLD",
	JUICES = "JUICES",
	BEER = "BEER",
	CHIPS = "CHIPS",
	COSMETICS = "COSMETICS",
	CANNED_GOODS = "CANNED_GOODS",
	BABY_FOOD = "BABY_FOOD",
	CEREALS = "CEREALS",
	COFFEE = "COFFEE",
	TEA = "TEA",
	COOKIES = "COOKIES",
	SODA = "SODA",
	PASTA = "PASTA",
}

export interface SimulationParams {
	entryPoint: { x: number; y: number };
	duration: number; // в секундах
	productSelectionTimeMs: number;
}

export interface SimulationResponse {
	customerPaths: Array<{
		id: string;
		actions: Array<{
			type: "move" | "wait" | "buy";
			gridPosition: [number, number];
			duration?: number;
		}>;
	}>;
	heatmapData: Record<string, number>;
	statistics: {
		totalCustomers: number;
		averageTime: number;
	};
}
