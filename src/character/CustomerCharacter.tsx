// components/CustomerCharacter.tsx
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type JSX, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { lerp } from "three/src/math/MathUtils.js";
import { updateHeatmap } from "../store/simulationSlice";

export type CustomerAction = {
	type: "go" | "wait" | "buy";
	gridPosition: [number, number];
	duration?: number;
};

type CustomerCharacterProps = JSX.IntrinsicElements["group"] & {
	actions: CustomerAction[];
	speed?: number;
	onPathComplete?: () => void;
	position?: [number, number, number];
	yOffset?: number; // Новый параметр для вертикального смещения
	modelRotation?: number;
};

type BuyerGLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>;
	materials: Record<string, THREE.MeshStandardMaterial>;
};

export const CustomerCharacter = ({
	actions,
	speed = 0.5,
	onPathComplete,
	position = [0, 0, 0],
	yOffset = 0.5, // Значение по умолчанию для смещения по Y
	modelRotation = Math.PI,
	...props
}: CustomerCharacterProps) => {
	const groupRef = useRef<THREE.Group>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [progress, setProgress] = useState(0);

	console.log(progress);

	const dispatch = useDispatch();

	const { nodes, materials } = useGLTF(
		"/models/buyer.glb",
	) as unknown as BuyerGLTFResult;

	useFrame((_, delta) => {
		if (!groupRef.current) return;

		if (currentIndex >= actions.length) {
			if (onPathComplete) onPathComplete();
			return;
		}

		const currentAction = actions[currentIndex];
		const nextAction = actions[currentIndex + 1];

		if (currentAction.type === "go" && nextAction?.type === "go") {
			setProgress((prev) => {
				const newProgress = prev + delta * (speed || 0.5);

				if (newProgress >= 1) {
					setCurrentIndex(currentIndex + 1);
					return 0;
				}

				const startPos = gridToWorld(currentAction.gridPosition, yOffset);
				const endPos = gridToWorld(nextAction.gridPosition, yOffset);

				const currentGridPos = [
					Math.round(
						lerp(
							currentAction.gridPosition[0],
							nextAction.gridPosition[0],
							newProgress,
						),
					),
					Math.round(
						lerp(
							currentAction.gridPosition[1],
							nextAction.gridPosition[1],
							newProgress,
						),
					),
				] as [number, number];

				dispatch(updateHeatmap(currentGridPos));

				groupRef.current?.position.lerpVectors(
					new THREE.Vector3(...startPos),
					new THREE.Vector3(...endPos),
					newProgress,
				);
				const direction = new THREE.Vector3().subVectors(
					new THREE.Vector3(...endPos),
					new THREE.Vector3(...startPos),
				);
				if (direction.length() > 0) {
					const angle = Math.atan2(direction.x, direction.z);
					if (groupRef.current)
						groupRef.current.rotation.y = angle + modelRotation;
				}

				// groupRef.current?.lookAt(new THREE.Vector3(...endPos));
				return newProgress;
			});
		} else if (currentAction.type === "wait") {
			setProgress((prev) => {
				const newProgress = prev + delta;
				if (newProgress >= (currentAction.duration || 1)) {
					setCurrentIndex(currentIndex + 1);
					return 0;
				}
				return newProgress;
			});
		}
	});

	return (
		<group ref={groupRef} position={position} {...props}>
			<mesh
				geometry={nodes._0.geometry}
				material={materials["#010101"]}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes._0_1.geometry}
				material={materials["#171717"]}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes._0_2.geometry}
				material={materials["#FF9951"]}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes._0_3.geometry}
				material={materials["#2F2F2F"]}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes._0_4.geometry}
				material={materials["#7E0000"]}
				castShadow
				receiveShadow
			/>
		</group>
	);
};

// Обновленная функция с вертикальным смещением
function gridToWorld(
	[col, row]: [number, number],
	yOffset = 0.5,
): [number, number, number] {
	const CELL_SIZE = 1;
	const GRID_OFFSET = 10;
	return [
		col * CELL_SIZE - GRID_OFFSET + CELL_SIZE / 2, // X
		yOffset, // Y - теперь используем переданное смещение
		row * CELL_SIZE - GRID_OFFSET + CELL_SIZE / 2, // Z
	];
}

useGLTF.preload("/models/buyer.glb");
