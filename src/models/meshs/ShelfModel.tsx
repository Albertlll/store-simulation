import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import type * as THREE from "three";
import type { GLTF } from "three-stdlib";

type ShelfGLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>;
	materials: Record<string, THREE.MeshStandardMaterial>;
};

type ShelfModelProps = JSX.IntrinsicElements["mesh"] & {
	position?: [number, number, number];
};

export function ShelfModel({
	position = [0, 0, 0],
	...props
}: ShelfModelProps) {
	const { nodes, materials } = useGLTF(
		"/models/shelf.glb",
	) as unknown as ShelfGLTFResult;

	return (
		<mesh position={position} castShadow {...props}>
			<group dispose={null} scale={83}>
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
		</mesh>
	);
}

useGLTF.preload("/models/shelf.glb");
