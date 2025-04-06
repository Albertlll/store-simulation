import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import type * as THREE from "three";
import { MeshStandardMaterial } from "three";
import type { GLTF } from "three-stdlib";

type RefrigGLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>;
	materials: Record<string, THREE.MeshStandardMaterial>;
};

// const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

type RefrigModelProps = JSX.IntrinsicElements["mesh"] & {
	position?: [number, number, number];
};

export function Casher({ position = [0, 0, 0], ...props }: RefrigModelProps) {
	const { nodes, materials } = useGLTF(
		"/models/casher.glb",
	) as unknown as RefrigGLTFResult;

	console.log(nodes);
	console.log(materials);

	// const customMaterial = new MeshStandardMaterial({
	// 	color: "orange",
	// 	metalness: 0.5,
	// 	roughness: 0.3,
	// });

	return (
		<mesh position={position} castShadow {...props}>
			<group dispose={null} scale={1}>
				<mesh
					castShadow
					rotateY={Math.PI / 2}
					receiveShadow
					geometry={nodes.Untitled.geometry}
					material={materials.palette}
				/>
			</group>
		</mesh>
	);
}

useGLTF.preload("/models/casher.glb");
