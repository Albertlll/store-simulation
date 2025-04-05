import { Grid, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FieldObject } from "./FieldObject";
import type { ObjectType, SceneObject } from "./types/scene";
import { Toolbar } from "./ui/toolbar";
import { snapToGrid } from "./utils/gridUtil";

const GRID_SIZE = 20;
const CELL_SIZE = 1;
const GRID_OFFSET = (GRID_SIZE * CELL_SIZE) / 2; // Смещение для центрирования сетки

function App() {
	const [objects, setObjects] = useState<SceneObject[]>([]);
	// const [draggingType, setDraggingType] = useState<ObjectType | null>(null);
	const planeRef = useRef<THREE.Mesh>(null);
	const [mousePosition, setMousePosition] = useState<THREE.Vector2 | null>(
		null,
	);

	console.log(12);

	// Следим за позицией мыши на канвасе
	const handleCanvasMouseMove = (e: React.MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
		const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
		setMousePosition(new THREE.Vector2(x, y));
	};

	const handleDragStart = (type: ObjectType) => (e: React.DragEvent) => {
		e.dataTransfer.setData("type", type);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const type = e.dataTransfer.getData("type") as ObjectType;

		if (type && mousePosition && planeRef.current) {
			// Создаем рейкастер и определяем точку на плоскости
			const rect = e.currentTarget.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
			const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

			// Обновляем позицию мыши
			setMousePosition(new THREE.Vector2(x, y));
		}

		if (type) {
			setObjects([
				...objects,
				{
					id: Date.now(),
					type,
					position: [0, 0, 0], // Будет обновлено в PositionUpdater
					gridPosition: [0, 0], // Будет обновлено в PositionUpdater
					isDragging: true,
					visible: false, // Объект изначально невидим
				},
			]);
		}
		// setDraggingType(null);
	};

	// Функция для обновления позиции объекта
	const updateObjectPosition = (
		id: number,
		position: [number, number, number],
		gridPosition: [number, number],
	) => {
		setObjects(
			objects.map((obj) =>
				obj.id === id
					? { ...obj, position, gridPosition, isDragging: false }
					: obj,
			),
		);
	};

	return (
		<div
			style={{ position: "relative", width: "100vw", height: "100vh" }}
			onMouseMove={handleCanvasMouseMove}
		>
			{/* UI Панель */}
			<Toolbar onDragStart={handleDragStart} />

			<Canvas
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
				camera={{ position: [0, 10, 15], fov: 50 }}
				shadows
				style={{ background: "#d8f5ff" }}
			>
				{/* Основное освещение */}
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

				{/* Заполняющий свет с противоположной стороны */}
				<directionalLight
					position={[-10, 10, -10]}
					intensity={0.5}
					color="#ffffee"
				/>
				{/* <ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} /> */}
				<OrbitControls />

				{/* Плоскость для размещения объектов */}
				<Plane
					ref={planeRef}
					args={[GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE]}
					rotation={[-Math.PI / 2, 0, 0]}
					position={[0, 0, 0]}
				>
					<meshStandardMaterial color="gray" transparent opacity={1} />
				</Plane>

				<gridHelper args={[20, 20, "#444", "#444"]} position={[0, 0.01, 0]} />

				{objects.map((obj) => (
					<FieldObject
						key={obj.id}
						{...obj}
						updatePosition={(pos) => {
							const snappedPos = snapToGrid(pos);
							const gridX = Math.floor(
								(snappedPos[0] + GRID_OFFSET) / CELL_SIZE,
							);
							const gridZ = Math.floor(
								(snappedPos[2] + GRID_OFFSET) / CELL_SIZE,
							);
							updateObjectPosition(obj.id, snappedPos, [gridX, gridZ]);
						}}
					/>
				))}

				{/* Компонент для обработки объектов */}
				<PositionUpdater
					objects={objects}
					setObjects={setObjects}
					snapToGrid={snapToGrid}
					plane={planeRef.current}
				/>
			</Canvas>
		</div>
	);
}

// Компонент для обновления позиции новых объектов
function PositionUpdater({
	objects,
	setObjects,
	snapToGrid,
	plane,
}: {
	objects: SceneObject[];
	setObjects: React.Dispatch<React.SetStateAction<SceneObject[]>>;
	snapToGrid: (position: THREE.Vector3) => [number, number, number];
	plane: THREE.Mesh | null;
}) {
	const { camera, raycaster, mouse } = useThree();

	useEffect(() => {
		// Найти объекты, только что добавленные и требующие позиционирования
		const newObjects = objects.filter((obj) => obj.isDragging);

		if (newObjects.length > 0 && plane) {
			// Для каждого нового объекта найдем позицию на сетке
			const updatedObjects = objects.map((obj) => {
				if (obj.isDragging) {
					// Создать рейкаст от камеры через текущую позицию мыши
					raycaster.setFromCamera(mouse, camera);
					const intersects = raycaster.intersectObject(plane);

					if (intersects.length > 0) {
						// Привязать позицию к сетке
						const snappedPos = snapToGrid(intersects[0].point);
						const gridX = Math.floor((snappedPos[0] + GRID_OFFSET) / CELL_SIZE);
						const gridZ = Math.floor((snappedPos[2] + GRID_OFFSET) / CELL_SIZE);

						return {
							...obj,
							position: snappedPos,
							gridPosition: [gridX, gridZ] as [number, number],
							isDragging: false,
							visible: true, // Объект становится видимым только в финальной позиции
						};
					}
				}
				return obj;
			});

			setObjects(updatedObjects as SceneObject[]);
		}
	}, [objects, setObjects, snapToGrid, plane, raycaster, camera, mouse]);

	return null;
}

export default App;
