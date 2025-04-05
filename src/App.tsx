import { OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type * as THREE from "three";
import { FieldObject } from "./models/FieldObject";
import { addObject } from "./store/objectsSlice";
import type { RootState } from "./store/store";
import type { SceneObject, SceneObjectType } from "./types/scene";
import { Toolbar } from "./ui/toolbar";
import { snapToGrid } from "./utils/gridUtil";

const GRID_SIZE = 20;
const CELL_SIZE = 1;
const GRID_OFFSET = (GRID_SIZE * CELL_SIZE) / 2;

export default function App() {
	const dispatch = useDispatch();
	const objects = useSelector((state: RootState) => state.objects.items);
	const planeRef = useRef<THREE.Mesh>(null);

	const handleDragStart = (type: SceneObjectType) => (e: React.DragEvent) => {
		e.dataTransfer.setData("type", type);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const type = e.dataTransfer.getData("type") as SceneObjectType;
		if (!planeRef.current) return;

		const newObj: SceneObject = {
			id: Date.now(),
			type,
			position: [0, 0, 0],
			gridPosition: [0, 0],
			isDragging: true,
			visible: false,
		};

		dispatch(addObject(newObj));
	};

	return (
		<div
			style={{ position: "relative", width: "100vw", height: "100vh" }}
			onDragOver={(e) => e.preventDefault()}
			onDrop={handleDrop}
		>
			<Toolbar onDragStart={handleDragStart} />

			<Canvas
				camera={{ position: [0, 10, 15], fov: 50 }}
				shadows
				style={{ background: "#d8f5ff" }}
			>
				{/* Освещение */}
				<ambientLight intensity={0.5} />
				<directionalLight
					position={[10, 20, 10]}
					intensity={1.2}
					castShadow
					shadow-mapSize={[2048, 2048]}
					shadow-camera-far={50}
					shadow-camera-left={-20}
					shadow-camera-right={20}
					shadow-camera-top={20}
					shadow-camera-bottom={-20}
				/>
				<directionalLight
					position={[-10, 10, -10]}
					intensity={0.5}
					color="#ffffee"
				/>
				<OrbitControls makeDefault />

				{/* Плоскость для размещения объектов */}
				<Plane
					ref={planeRef}
					args={[GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE]}
					rotation={[-Math.PI / 2, 0, 0]}
					position={[0, 0, 0]}
				>
					<meshStandardMaterial color="gray" transparent opacity={0.5} />
				</Plane>

				{/* Сетка */}
				<gridHelper
					args={[GRID_SIZE, GRID_SIZE, "#444", "#444"]}
					position={[0, 0.01, 0]}
				/>

				{/* Отрисовка объектов */}
				{objects.map((obj: SceneObject) => (
					<FieldObject
						key={obj.id}
						{...obj}
						snapToGrid={snapToGrid}
						planeRef={planeRef}
						gridOffset={GRID_OFFSET}
						cellSize={CELL_SIZE}
					/>
				))}
			</Canvas>
		</div>
	);
}
