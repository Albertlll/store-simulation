export type ObjectType = "cube" | "sphere" | "cylinder";

export interface SceneObject {
	id: number;
	type: ObjectType;
	position: [number, number, number];
	gridPosition: [number, number];
	isDragging?: boolean;
	visible?: boolean;
}

export const GRID_SIZE = 20;
export const CELL_SIZE = 1;
export const GRID_OFFSET = (GRID_SIZE * CELL_SIZE) / 2;
