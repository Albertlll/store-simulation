import { OrbitControls, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function App() {
	return (
		<Canvas
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

			{/* Подсветка сбоку */}
			<hemisphereLight groundColor="#ffffee" color="#ffffff" intensity={0.3} />

			{/* Мягкие тени */}
			<SoftShadows size={25} focus={1} samples={10} />

			{/* Пол */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial color="#bffd79" roughness={0.5} />
			</mesh>

			{/* Сетка */}
			<gridHelper args={[20, 20, "#666", "#444"]} position={[0, 0.01, 0]} />

			{/* Тестовый красный куб */}
			<mesh position={[9.5, 0.5, 9.5]} castShadow>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial
					color="red"
					roughness={0.3}
					metalness={0.2}
					emissive="#ff0000"
					emissiveIntensity={0.1}
				/>
			</mesh>

			<OrbitControls
				minDistance={5}
				maxDistance={30}
				enablePan={true}
				zoomSpeed={0.5}
			/>
		</Canvas>
	);
}

export default App;
