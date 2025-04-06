import { useDispatch, useSelector } from "react-redux";
import {
	removeObject,
	selectObject,
	selectSelectedObject,
	updateObject,
} from "../store/objectsSlice";
import { GRID_SIZE, ProductType, Shelf } from "../types/scene";

export const ObjectInfoPanel = () => {
	const selectedObject = useSelector(selectSelectedObject);
	const dispatch = useDispatch();

	if (!selectedObject) return null;

	const handleGridPositionChange = (axis: "col" | "row", value: number) => {
		const newGridPos = [...selectedObject.gridPosition] as [number, number];
		newGridPos[axis === "col" ? 0 : 1] = value;
		dispatch(
			updateObject({
				id: selectedObject.id,
				gridPosition: newGridPos,
				position: gridToWorld(newGridPos),
			}),
		);
	};

	const handleDelete = () => {
		dispatch(removeObject(selectedObject.id));
		dispatch(selectObject(null));
	};

	return (
		<div className="z-[100] bg-main/70 p-5 rounded-lg text-white w-64 backdrop-blur-sm">
			<div className="flex justify-between items-center mb-2">
				<h3 className="text-lg font-semibold">Свойства объекта</h3>
				<button
					onClick={handleDelete}
					className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
					type="button"
				>
					Удалить
				</button>
			</div>

			<div className="space-y-3">
				<div>
					<span className="font-medium">Тип:</span> {selectedObject.type}
				</div>

				<div className="space-y-1">
					<span className="font-medium">Позиция</span>
					<div className="grid grid-cols-2 gap-2">
						{["col", "row"].map((axis) => (
							<div key={axis}>
								{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="block text-xs text-gray-300">
									{axis === "col" ? "Колонка" : "Ряд"}
								</label>
								<input
									type="number"
									value={selectedObject.gridPosition[axis === "col" ? 0 : 1]}
									onChange={(e) =>
										handleGridPositionChange(
											axis as "col" | "row",
											Number.parseInt(e.target.value),
										)
									}
									className="w-full px-2 py-1 bg-gray-700 rounded text-white text-sm"
									min="0"
									max={GRID_SIZE - 1}
								/>
							</div>
						))}
					</div>
				</div>

				<div className="pt-1">
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label className="block text-sm font-medium mb-1">
						Поворот (градусы):
					</label>
					<input
						type="number"
						value={selectedObject.rotation || 0}
						onChange={(e) => {
							dispatch(
								updateObject({
									id: selectedObject.id,
									rotation: Number.parseInt(e.target.value),
								}),
							);
						}}
						className="w-full px-2 py-1 bg-gray-700 rounded text-white"
						min="0"
						max="360"
						step="15"
					/>
				</div>
			</div>
		</div>
	);
};

// Вспомогательные функции для преобразования координат
const CELL_SIZE = 1;
const GRID_OFFSET = (GRID_SIZE * CELL_SIZE) / 2;

function gridToWorld([col, row]: [number, number]): [number, number, number] {
	return [
		col * CELL_SIZE - GRID_OFFSET + CELL_SIZE / 2,
		0,
		row * CELL_SIZE - GRID_OFFSET + CELL_SIZE / 2,
	];
}
