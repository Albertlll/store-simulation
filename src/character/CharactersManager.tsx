import { useEffect, useState } from "react";
// components/CharactersManager.tsx
import { useAppSelector } from "../store/store";
import { type CustomerAction, CustomerCharacter } from "./CustomerCharacter";

export type CharacterData = {
	id: string;
	actions: CustomerAction[];
	speed?: number;
	position?: [number, number, number];
};

export const CharactersManager = () => {
	const { viewMode } = useAppSelector((state) => state.ui);
	const [characters, setCharacters] = useState<CharacterData[]>([]);

	// Загрузка тестовых персонажей (в реальном приложении можно получать из стора или API)
	useEffect(() => {
		if (viewMode === "simulation") {
			setCharacters([
				{
					id: "customer-1",
					actions: [
						{ type: "go", gridPosition: [0, 0] },
						{ type: "go", gridPosition: [0, 19] },
						{ type: "go", gridPosition: [10, 19] },
					],
					speed: 0.4,
				},
				{
					id: "customer-2",
					actions: [
						{ type: "go", gridPosition: [19, 0] },
						{ type: "go", gridPosition: [0, 0] },
						{ type: "go", gridPosition: [0, 10] },
					],
					speed: 0.5,
				},
				{
					id: "customer-3",
					actions: [
						{ type: "go", gridPosition: [5, 5] },
						{ type: "go", gridPosition: [5, 15] },
						{ type: "go", gridPosition: [15, 15] },
						{ type: "go", gridPosition: [15, 5] },
					],
					speed: 0.3,
				},
				{
					id: "customer-4",
					actions: [
						{ type: "go", gridPosition: [10, 0] },
						{ type: "go", gridPosition: [10, 10] },
						{ type: "go", gridPosition: [0, 10] },
						{ type: "go", gridPosition: [0, 0] },
					],
					speed: 0.6,
				},
				{
					id: "customer-5",
					actions: [
						{ type: "go", gridPosition: [19, 19] },
						{ type: "go", gridPosition: [0, 19] },
						{ type: "go", gridPosition: [0, 0] },
						{ type: "go", gridPosition: [19, 0] },
					],
					speed: 0.45,
				},
			]);
		} else {
			setCharacters([]);
		}
	}, [viewMode]);

	const handlePathComplete = (id: string) => {
		console.log(`Character ${id} completed path`);
		setCharacters((prev) => prev.filter((c) => c.id !== id)); // Удаляем персонажа
	};

	if (viewMode !== "simulation") return null;

	return (
		<>
			{characters.map((character) => (
				<CustomerCharacter
					scale={80}
					key={character.id}
					actions={character.actions}
					speed={character.speed}
					position={character.position}
					onPathComplete={() => handlePathComplete(character.id)}
				/>
			))}
		</>
	);
};
