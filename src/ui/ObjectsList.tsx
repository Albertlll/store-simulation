import { useDispatch, useSelector } from "react-redux";
import { selectObject } from "../store/objectsSlice";
import type { RootState } from "../store/store";
// import type { SceneObject } from "../types/scene";

function ObjectsList() {
	const dispatch = useDispatch();
	const objects = useSelector((state: RootState) => state.objects.items);
	// const selectedId = useSelector(
	// 	(state: RootState) => state.objects.selectedId,
	// );

	const handleSelect = (id: number) => {
		dispatch(selectObject(id));
	};

	return (
		<div className="absolute top-5 right-5 z-[100] bg-main/70 p-6 rounded-xl text-white backdrop-blur-sm w-64">
			<h3 className="text-lg font-semibold mb-3">Все объекты</h3>
			<div className="space-y-2 max-h-96 overflow-y-auto">
				{/* Здесь будет список объектов */}
				{objects.map((obj) => (
					<button
						type="button"
						onClick={() => handleSelect(obj.id)}
						key={obj.id}
						className="p-2 hover:bg-main rounded cursor-pointer"
					>
						{obj.type}
					</button>
				))}
			</div>
		</div>
	);
}

export default ObjectsList;
