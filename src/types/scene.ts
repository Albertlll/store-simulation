export type SceneObjectType =
	| "cashRegister"
	| "shelf"
	| "refrigerator"
	| "character";

export interface SceneObject {
	id: number;
	type: SceneObjectType;
	position: [number, number, number]; // [x, y, z]
	rotation?: number; // Угол поворота в градусах (0-360)
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
	productType: string;
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
