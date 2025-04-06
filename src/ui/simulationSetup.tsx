// components/SimulationSetupPanel.tsx
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { SimulationParams } from "../types/scene";
import type { CashRegister, SceneObject, Shelf } from "../types/scene";

export const SimulationSetupPanel = () => {
	const [params, setParams] = useState<SimulationParams>({
		entryPoint: { x: 1, y: 9 },
		duration: 300,
		productSelectionTimeMs: 5000,
	});

	// Допустим, у вас в Redux‑хранилище хранится список всех объектов
	const objects = useSelector((state: RootState) => state.objects.items);

	// Фильтрация полок и касс (при условии, что типы заданы именно так)
	const shelves = objects.filter(
		(obj: SceneObject) => obj.type === "shelf",
	) as Shelf[];
	const cashRegisters = objects.filter(
		(obj: SceneObject) => obj.type === "cashRegister",
	) as CashRegister[];

	const handleSubmit = async () => {
		const startTime = Date.now();
		const endTime = startTime + params.duration * 1000;

		const payload = {
			entryPoint: params.entryPoint,
			startTime, // в миллисекундах
			endTime, // в миллисекундах
			obstacles: [],
			shelves: shelves.map((shelf: Shelf) => ({
				position: {
					x: shelf.gridPosition[0],
					y: shelf.gridPosition[1],
				},
				productType: shelf.productType,
			})),
			cashRegisters: cashRegisters.map((cash: CashRegister) => ({
				x: cash.gridPosition[0],
				y: cash.gridPosition[1],
			})),
			productSelectionTimeMs: params.productSelectionTimeMs,
		};

		try {
			const response = await fetch("https://your.api/endpoint", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error("Ошибка при отправке запроса");
			}

			const data = await response.json();
			console.log("Ответ API:", data);
		} catch (error) {
			console.error("Ошибка:", error);
		}
	};

	return (
		<div className="relative z-[100] bg-main/70 p-6 rounded-xl text-white backdrop-blur-sm w-80">
			<h3 className="text-lg font-semibold mb-3">Настройка симуляции</h3>

			<div className="space-y-4">
				<div>
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label className="block text-sm font-medium mb-1">
						Точка входа (X, Y):
					</label>
					<div className="flex gap-2">
						<input
							type="number"
							value={params.entryPoint.x}
							onChange={(e) =>
								setParams({
									...params,
									entryPoint: {
										...params.entryPoint,
										x: Number.parseInt(e.target.value),
									},
								})
							}
							className="w-full px-2 py-1 bg-gray-700 rounded text-white"
							min="0"
							max="19"
						/>
						<input
							type="number"
							value={params.entryPoint.y}
							onChange={(e) =>
								setParams({
									...params,
									entryPoint: {
										...params.entryPoint,
										y: Number.parseInt(e.target.value),
									},
								})
							}
							className="w-full px-2 py-1 bg-gray-700 rounded text-white"
							min="0"
							max="19"
						/>
					</div>
				</div>

				<div>
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label className="block text-sm font-medium mb-1">
						Длительность (сек):
					</label>
					<input
						type="number"
						value={params.duration}
						onChange={(e) =>
							setParams({
								...params,
								duration: Number.parseInt(e.target.value),
							})
						}
						className="w-full px-2 py-1 bg-gray-700 rounded text-white"
						min="10"
						max="3600"
					/>
				</div>

				<div>
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label className="block text-sm font-medium mb-1">
						Время выбора товара (мс):
					</label>
					<input
						type="number"
						value={params.productSelectionTimeMs}
						onChange={(e) =>
							setParams({
								...params,
								productSelectionTimeMs: Number.parseInt(e.target.value),
							})
						}
						className="w-full px-2 py-1 bg-gray-700 rounded text-white"
						min="1000"
						max="30000"
					/>
				</div>
			</div>

			{/* Кнопка для отправки запроса */}
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			{/* <button
				onClick={handleSubmit}
				className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded"
			>
				Запустить симуляцию
			</button> */}
		</div>
	);
};
