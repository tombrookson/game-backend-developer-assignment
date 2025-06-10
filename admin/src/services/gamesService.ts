import { Game } from "../models/game";

export const BASE_URL = "http://127.0.0.1:5001/demo-project/europe-west3/api/v1";

export const getGames = async (): Promise<Game[]> => {
    const response = await fetch(`${BASE_URL}/games`);
    if (!response.ok) {
        throw new Error(`Failed to fetch games: ${response.status}`);
    }
    return await response.json();
};

export const getGameById = async (id: string): Promise<Game> => {
    const response = await fetch(`${BASE_URL}/games/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch game with ID ${id}: ${response.status}`);
    }
    return await response.json();
};

export const postGame = async (game: Game): Promise<Game> => {
    const response = await fetch(`${BASE_URL}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    });

    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody?.error || 'Failed to create game');
    }

    return await response.json();
};

export const putGame = async (id: string, game: Omit<Game, "id">): Promise<Game> => {
    const response = await fetch(`${BASE_URL}/games/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    });

    if (!response.ok) {
        throw new Error(`Failed to update game with ID ${id}: ${response.status}`);
    }

    return await response.json();
};

export const deleteGame = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/games/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete game with ID ${id}: ${response.status}`);
    }
};
