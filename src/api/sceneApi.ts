import type { SceneObject } from "../types/scene";
import { apiClient } from "./apiClient";

// Пример функции для получения данных сцены
export const fetchSceneObjects = async (): Promise<SceneObject[]> => {
	const response = await apiClient.get("/scene/objects");
	return response.data;
};

// Пример функции для отправки обновлений объекта на бэк
export const updateSceneObject = async (
	object: SceneObject,
): Promise<SceneObject> => {
	const response = await apiClient.put(`/scene/objects/${object.id}`, object);
	return response.data;
};
