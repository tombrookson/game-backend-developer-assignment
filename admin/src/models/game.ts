export interface Game {
    id: string;
    name: string;
    releaseYear: number;
    players: {
        min: number;
        max: number;
    };
    publisher: string;
    expansions: string[];
    type: 'BaseGame' | 'Expansion';
}