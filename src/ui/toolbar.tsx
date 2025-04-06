import type { SceneObjectType } from "../types/scene";

type ToolbarProps = {
	onDragStart: (type: SceneObjectType) => (e: React.DragEvent) => void;
};

export function Toolbar({ onDragStart }: ToolbarProps) {
	return (
		<>
			<div className="z-[100] bg-main/70 p-5 rounded-lg text-white backdrop-blur-sm">
				<h3 className="text-lg font-semibold mb-2">Элементы</h3>

				<div className="flex flex-col gap-2">
					<div
						draggable
						onDragStart={onDragStart("shelf")}
						className="px-2 py-1 cursor-grab hover:bg-main rounded transition-colors"
					>
						Полка
					</div>

					<div
						draggable
						onDragStart={onDragStart("refrigerator")}
						className="px-2 py-1 cursor-grab hover:bg-main rounded transition-colors"
					>
						Холодильник
					</div>

					<div
						draggable
						onDragStart={onDragStart("cashRegister")}
						className="px-2 py-1 cursor-grab hover:bg-main rounded transition-colors"
					>
						Касса
					</div>
				</div>
			</div>
		</>
	);
}
