import type { SceneObjectType } from "../types/scene";

type ToolbarProps = {
	onDragStart: (type: SceneObjectType) => (e: React.DragEvent) => void;
};

export function Toolbar({ onDragStart }: ToolbarProps) {
	return (
		<>
			<div className="absolute top-5 left-5 z-[100] bg-black/70 p-10 rounded-lg text-white">
				<h3 className="text-lg font-semibold mb-2">Элементы</h3>

				<div className="flex flex-col gap-2">
					<div
						draggable
						onDragStart={onDragStart("shelf")}
						className="px-2 py-1 cursor-grab hover:bg-gray-600/50 rounded transition-colors"
					>
						Полка
					</div>

					<div
						draggable
						onDragStart={onDragStart("refrigerator")}
						className="px-2 py-1 cursor-grab hover:bg-gray-600/50 rounded transition-colors"
					>
						Холодильник
					</div>

					<div
						draggable
						onDragStart={onDragStart("cashRegister")}
						className="px-2 py-1 cursor-grab hover:bg-gray-600/50 rounded transition-colors"
					>
						Касса
					</div>
				</div>
			</div>

			<div className="z-100 absolute top-5 right-5">
				<button className="" type="button">
					Режим редактировани
				</button>
			</div>
		</>
	);
}
