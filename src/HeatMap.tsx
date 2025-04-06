// components/HeatmapPlane.tsx
import { useMemo } from "react";
import * as THREE from "three";
import { useAppSelector } from "./store/store";
import { GRID_SIZE } from "./types/scene";

export const HeatmapPlane = () => {
	const { heatmapData, maxHeatValue, heatmapEnabled } = useAppSelector(
		(state) => state.simulation,
	);

	// Создаем текстуру тепловой карты
	const texture = useMemo(() => {
		if (!heatmapEnabled || maxHeatValue === 0) return null;

		const canvas = document.createElement("canvas");
		canvas.width = GRID_SIZE;
		canvas.height = GRID_SIZE;
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const ctx = canvas.getContext("2d")!;

		// Очищаем canvas
		ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);

		// Рисуем тепловую карту
		for (let col = 0; col < GRID_SIZE; col++) {
			for (let row = 0; row < GRID_SIZE; row++) {
				const key = `${col},${row}`;
				const value = heatmapData[key] || 0;
				const intensity = value / maxHeatValue;

				if (intensity > 0) {
					const hue = (1 - intensity) * 240; // От синего (0) к красному (240)
					ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
					ctx.globalAlpha = 0.7 * intensity;
					// Исправлено: рисуем пиксель в правильной позиции
					ctx.fillRect(col, row, 1, 1);
				}
			}
		}
		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		return texture;
	}, [heatmapData, maxHeatValue, heatmapEnabled]);

	if (!heatmapEnabled || !texture) return null;

	return (
		<mesh
			rotation={[-Math.PI / 2, 0, 0]}
			position={[0, 0.02, 0]} // Чуть выше основной плоскости
		>
			<planeGeometry args={[GRID_SIZE, GRID_SIZE]} />
			<meshBasicMaterial map={texture} transparent={true} opacity={0.7} />
		</mesh>
	);
};
