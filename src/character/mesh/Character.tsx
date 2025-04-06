import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type JSX, useRef, useState } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

type CustomerAction = {
	type: "go" | "wait" | "buy";
	coord: { x: number; y: number };
	duration: number;
};

type CustomerCharacterProps = JSX.IntrinsicElements["group"] & {
	actions: CustomerAction[];
	speed?: number;
};

type BuyerGLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>;
	materials: Record<string, THREE.MeshStandardMaterial>;
};

export const CustomerCharacter = ({
	actions,
	speed = 0.5,
	...props
}: CustomerCharacterProps) => {
	const groupRef = useRef<THREE.Group>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	console.log(progress);

	const { nodes, materials } = useGLTF(
		"/models/buyer.glb",
	) as unknown as BuyerGLTFResult;

	useFrame((_, delta) => {
		if (!groupRef.current || currentIndex >= actions.length) return;

		const currentAction = actions[currentIndex];
		const nextAction = actions[currentIndex + 1];

		if (currentAction.type === "go" && nextAction?.type === "go") {
			setProgress((prev) => {
				const newProgress = prev + delta * speed;
				if (newProgress >= 1) {
					setCurrentIndex((prevIdx) => prevIdx + 1);
					return 0;
				}

				// Плавное перемещение
				const startPos = new THREE.Vector3(
					currentAction.coord.x,
					0,
					currentAction.coord.y,
				);
				const endPos = new THREE.Vector3(
					nextAction.coord.x,
					0,
					nextAction.coord.y,
				);
				groupRef.current?.position.lerpVectors(startPos, endPos, newProgress);

				// Автоповорот в направлении движения
				groupRef.current?.lookAt(endPos);
				return newProgress;
			});
		} else if (currentAction.type === "wait") {
			setProgress((prev) => {
				const newProgress = prev + delta;
				if (newProgress >= currentAction.duration) {
					setCurrentIndex((prevIdx) => prevIdx + 1);
					return 0;
				}
				// Анимация ожидания (легкое покачивание)
				if (groupRef.current)
					groupRef.current.position.y = Math.sin(newProgress * 5) * 0.05;
				return newProgress;
			});
		}
	});

	if (currentIndex >= actions.length) return null;

	return (
		<group ref={groupRef} {...props}>
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

useGLTF.preload("/models/buyer.glb");
