import type { ObjectType } from "../types/scene";

type ToolbarProps = {
	onDragStart: (type: ObjectType) => (e: React.DragEvent) => void;
};

export function Toolbar({ onDragStart }: ToolbarProps) {
	return (
		<div
			style={{
				position: "absolute",
				top: 20,
				left: 20,
				zIndex: 100,
				background: "rgba(0,0,0,0.7)",
				padding: "10px",
				borderRadius: "8px",
				color: "white",
			}}
		>
			<h3>Элементы</h3>
			<div
				draggable
				onDragStart={onDragStart("cube")}
				style={{ padding: "8px", cursor: "grab" }}
			>
				Полка
			</div>
			<div
				draggable
				onDragStart={onDragStart("sphere")}
				style={{ padding: "8px", cursor: "grab" }}
			>
				Холодильник
			</div>
			<div
				draggable
				onDragStart={onDragStart("cylinder")}
				style={{ padding: "8px", cursor: "grab" }}
			>
				Касса
			</div>
		</div>
	);
}
