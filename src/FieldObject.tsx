import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type JSX, useRef, useState } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import type { SceneObject } from "./types/scene";

type FieldObjectProps = SceneObject & {
	updatePosition: (position: THREE.Vector3) => void;
};

type ShelfGLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>;
	materials: Record<string, THREE.MeshStandardMaterial>;
};

export function ShelfModel(
	props: JSX.IntrinsicElements["group"] & { args?: number[] },
) {
	const { nodes, materials } = useGLTF(
		"/models/shelf.glb",
	) as unknown as ShelfGLTFResult;

	console.log(materials);

	return (
		<group {...props} dispose={null} scale={99} translateY={5}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes._0.geometry}
				material={materials["#666666"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes._0_1.geometry}
				material={materials["#660000"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes._0_2.geometry}
				material={materials["#170000"]}
			/>
		</group>
	);
}

useGLTF.preload("/models/shelf.glb");
export function FieldObject({
	id,
	type,
	position,
	visible = true,
	updatePosition,
}: FieldObjectProps) {
	const meshRef = useRef<THREE.Mesh>(null);
	const [isDragging, setIsDragging] = useState(false);

	useFrame((state) => {
		if (!isDragging || !meshRef.current) return;

		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(
			new THREE.Vector2(
				(state.mouse.x * state.viewport.width) / 2,
				(state.mouse.y * state.viewport.height) / 2,
			),
			state.camera,
		);

		const intersects = raycaster.intersectObject(
			meshRef.current.parent?.parent?.children[0] as THREE.Object3D,
		);

		if (intersects.length > 0) {
			updatePosition(intersects[0].point);
		}
	});

	if (!visible) return null;

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<mesh
			ref={meshRef}
			position={[position[0], position[1] + 0.6, position[2] - 0.2]}
			castShadow
			onClick={(e) => {
				e.stopPropagation();
				setIsDragging(!isDragging);
			}}
		>
			{type === "cube" && <ShelfModel />}
			{type === "sphere" && <sphereGeometry args={[0.45, 32, 32]} />}
			{type === "cylinder" && <cylinderGeometry args={[0.45, 0.45, 0.9, 32]} />}
			<meshStandardMaterial
				color={
					type === "cube"
						? "orange"
						: type === "sphere"
							? "hotpink"
							: "lightblue"
				}
				roughness={0.3}
				metalness={0.2}
				emissive={isDragging ? "white" : "black"}
				emissiveIntensity={0.1}
			/>
		</mesh>
	);
}
