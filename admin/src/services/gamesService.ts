import { Game } from "../models/game";

export const BASE_URL = "http://127.0.0.1:5001/demo-project/europe-west3/api/v1";

export const getGames = async (): Promise<Game[]> => {
    const response = await fetch(`${BASE_URL}/games`);
    if (!response.ok) {
        throw new Error(`Failed to fetch games: ${response.status}`);
    }

    const data = await response.json();
    return data as Game[];
};