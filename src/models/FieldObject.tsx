import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import type * as THREE from "three";
import { updateObject } from "../store/objectsSlice";
import type { SceneObject } from "../types/scene";
import { Character } from "./meshs/Character";
import { ShelfModel } from "./meshs/ShelfModel";

type FieldObjectProps = SceneObject & {
	snapToGrid: (pos: THREE.Vector3) => [number, number, number];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	planeRef: any;
	gridOffset: number;
	cellSize: number;
};

export const FieldObject = React.memo(function FieldObject({
	id,
	type,
	position,
	visible,
	isDragging,
	snapToGrid,
	planeRef,
	gridOffset,
	cellSize,
}: FieldObjectProps) {
	const dispatch = useDispatch();
	const meshRef = useRef<THREE.Mesh>(null);
	const [localDragging, setLocalDragging] = useState(isDragging);
	const { camera, raycaster, mouse } = useThree();

	useEffect(() => {
		setLocalDragging(isDragging);
	}, [isDragging]);

	useFrame(() => {
		if (!localDragging || !planeRef.current) return;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObject(planeRef.current);

		if (intersects.length > 0) {
			const point = intersects[0].point;
			const snapped = snapToGrid(point);
			const gridX = Math.floor((snapped[0] + gridOffset) / cellSize);
			const gridZ = Math.floor((snapped[2] + gridOffset) / cellSize);

			const updatedObject = {
				id,
				type,
				position: snapped,
				gridPosition: [gridX, gridZ] as [number, number],
				visible: true,
				isDragging: false,
				rotation: 0,
			};

			dispatch(updateObject(updatedObject));
			setLocalDragging(false);
		}
	});

	if (!visible) return null;

	return (
		<>
			{type === "shelf" && (
				<ShelfModel
					ref={meshRef}
					position={[position[0], position[1] + 0.47, position[2] - 0.1]}
				/>
			)}
			{/* ... (остальные типы объектов) ... */}
		</>
	);
});
