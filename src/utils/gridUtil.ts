import type * as THREE from "three";
import { CELL_SIZE, GRID_OFFSET, GRID_SIZE } from "../types/scene";

export const snapToGrid = (
	position: THREE.Vector3,
): [number, number, number] => {
	const gridX = Math.min(
		Math.max(Math.floor((position.x + GRID_OFFSET) / CELL_SIZE), 0),
		GRID_SIZE - 1,
	);
	const gridZ = Math.min(
		Math.max(Math.floor((position.z + GRID_OFFSET) / CELL_SIZE), 0),
		GRID_SIZE - 1,
	);

	const worldX = gridX * CELL_SIZE - GRID_OFFSET + CELL_SIZE / 2;
	const worldZ = gridZ * CELL_SIZE - GRID_OFFSET + CELL_SIZE / 2;

	return [worldX, 0, worldZ];
};
