import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import type * as THREE from "three";
import type { GLTF } from "three-stdlib";

type ShelfGLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>;
	materials: Record<string, THREE.MeshStandardMaterial>;
};

// const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

type ShelfModelProps = JSX.IntrinsicElements["mesh"] & {
	position?: [number, number, number];
};

export function ShelfModel({
	position = [0, 0, 0],
	...props
}: ShelfModelProps) {
	const { nodes, materials } = useGLTF(
		"/models/shelfnew.glb",
	) as unknown as ShelfGLTFResult;

	return (
		<mesh position={position} castShadow {...props}>
			<group dispose={null}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Untitled.geometry}
					material={materials["palette.001"]}
				/>
			</group>
		</mesh>
	);
}

useGLTF.preload("/models/shelfnew.glb");
