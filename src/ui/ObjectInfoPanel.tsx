import { useDispatch, useSelector } from "react-redux";
import { selectSelectedObject, updateObject } from "../store/objectsSlice";

export const ObjectInfoPanel = () => {
	const selectedObject = useSelector(selectSelectedObject);
	const dispatch = useDispatch();

	return (
		selectedObject && (
			<div className="z-[100] bg-main/70 p-5 rounded-lg text-white w-64  backdrop-blur-sm">
				<h3 className="text-lg font-semibold mb-2">Свойства объекта</h3>

				<div className="space-y-2">
					<div>
						<span className="font-medium">Тип:</span> {selectedObject.type}
					</div>
					<div>
						<span className="font-medium">Позиция:</span>
						{selectedObject.position.join(", ")}
					</div>
					<div>
						<span className="font-medium">Сетка:</span>
						{selectedObject.gridPosition.join(", ")}
					</div>

					<div className="pt-2">
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="block text-sm font-medium mb-1">
							Поворот (градусы):
						</label>
						<input
							type="number"
							value={selectedObject.rotation || 0}
							onChange={(e) => {
								const rotation = Number.parseInt(e.target.value);
								dispatch(updateObject({ id: selectedObject.id, rotation }));
							}}
							className="w-full px-2 py-1 bg-gray-700 rounded text-white"
							min="0"
							max="360"
							step="15"
						/>
					</div>
				</div>
			</div>
		)
	);
};
