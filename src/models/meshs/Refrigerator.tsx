import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import type * as THREE from "three";
import type { GLTF } from "three-stdlib";

type RefrigGLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>;
	materials: Record<string, THREE.MeshStandardMaterial>;
};

// const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

type RefrigModelProps = JSX.IntrinsicElements["mesh"] & {
	position?: [number, number, number];
};

export function RefrigModel({
	position = [0, 0, 0],
	...props
}: RefrigModelProps) {
	const { nodes, materials } = useGLTF(
		"/models/refrigerator.glb",
	) as unknown as RefrigGLTFResult;

	console.log(nodes);
	console.log(materials);

	return (
		<mesh position={position} castShadow {...props}>
			<group dispose={null} scale={83}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes._0.geometry}
					material={materials["#9999FF"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes._0_1.geometry}
					material={materials["#0899FF"]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes._0_2.geometry}
					material={materials["#0051FF"]}
				/>
			</group>
		</mesh>
	);
}

useGLTF.preload("/models/refrigerator.glb");
