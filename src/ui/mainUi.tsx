// components/mainUi.tsx
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleViewMode } from "../store/uiSlice";
import type { SceneObjectType } from "../types/scene";
import { ObjectInfoPanel } from "./ObjectInfoPanel";
import ObjectsList from "./ObjectsList";
import { Toolbar } from "./toolbar";

type ToolbarProps = {
	onDragStart: (type: SceneObjectType) => (e: React.DragEvent) => void;
};

export const MainUI = ({ onDragStart }: ToolbarProps) => {
	const dispatch = useAppDispatch();
	const { viewMode } = useAppSelector((state) => state.ui);
	const isEditMode = viewMode === "edit";

	return (
		<>
			{/* Режим редактирования */}
			{isEditMode && (
				<>
					{/* Левое облачко - Toolbar */}
					<div className="absolute flex flex-col h-[400px]  top-5 left-5 z-[100] gap-2  rounded-xl text-white">
						<Toolbar onDragStart={onDragStart} />
						<ObjectInfoPanel />
					</div>

					{/* Правое облачко - Список объектов */}
					<ObjectsList />
				</>
			)}

			{/* Режим симуляции */}
			{!isEditMode && (
				<>
					{/* Левое облачко - Аналитика */}
					<div className="absolute top-5 left-5 z-[100] bg-black/70 p-6 rounded-xl text-white backdrop-blur-sm w-80">
						<h3 className="text-lg font-semibold mb-3">Аналитика</h3>
						<div className="space-y-3">
							<div>
								<h4 className="font-medium">Посетители</h4>
								<p>Обслужено: 42</p>
								<p>Среднее время: 3:15</p>
							</div>
							<div>
								<h4 className="font-medium">Кассы</h4>
								<p>Свободные: 2/4</p>
							</div>
						</div>
					</div>

					{/* Правое облачко - Управление */}
					<div className="absolute top-5 right-5 z-[100] bg-black/70 p-6 rounded-xl text-white backdrop-blur-sm">
						<h3 className="text-lg font-semibold mb-3">Управление</h3>
						<button
							type="button"
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors mb-2 w-full"
						>
							Тепловая карта
						</button>
						<button
							type="button"
							className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors w-full"
						>
							Анализ очередей
						</button>
					</div>
				</>
			)}

			{/* Кнопка переключения режимов (общая) */}
			<div className="absolute bottom-5 right-5 z-[100]">
				<button
					type="button"
					onClick={() => dispatch(toggleViewMode())}
					className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white shadow-md transition-colors"
				>
					{isEditMode ? "Режим симуляции" : "Режим редактирования"}
				</button>
			</div>
		</>
	);
};
