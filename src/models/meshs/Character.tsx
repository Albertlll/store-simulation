import { useGLTF } from "@react-three/drei";
import type { JSX } from "react";
import type * as THREE from "three";
import type { GLTF } from "three-stdlib";

type ShelfGLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>;
	materials: Record<string, THREE.MeshStandardMaterial>;
};

export function Character(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF(
		"/models/buyer.glb",
	) as unknown as ShelfGLTFResult;

	console.log(materials);
	return (
		<group {...props} dispose={null} scale={90}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes._0.geometry}
				material={materials["#010101"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes._0_1.geometry}
				material={materials["#171717"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes._0_2.geometry}
				material={materials["#FF9951"]}
			/>

			<mesh
				castShadow
				receiveShadow
				geometry={nodes._0_3.geometry}
				material={materials["#2F2F2F"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes._0_4.geometry}
				material={materials["#7E0000"]}
			/>
		</group>
	);
}

useGLTF.preload("/models/buyer.glb");
