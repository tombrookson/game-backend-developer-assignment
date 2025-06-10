import { z } from 'zod';
import { Game } from "../models/game";
import { GamesRepository } from "../repositories/gamesRepository";
import { gameValidator } from '../validators/game';
import { HttpError } from '../exceptions/HttpError';

export class GamesService {
    constructor(private readonly repo: GamesRepository) { }

    async getGames(): Promise<Game[]> {
        return this.repo.getAll();
    }

    async getGameById(id: string): Promise<Game | null> {
        return this.repo.getById(id);
    }

    async createGame(game: unknown): Promise<Game> {
        let gameData: Game;

        try {
            gameData = gameValidator.parse(game) as Game;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const messages = err.issues.map(issue => `${issue.code} - ${issue.message}`).join(', ');
                throw new HttpError(`Validation failed: ${messages}`, 400);
            }
            throw new HttpError('Unknown error during validation', 500);
        }

        return this.repo.create(gameData);
    }

    async updateGame(id: string, game: unknown): Promise<Game> {
        let gameData: Omit<Game, 'id'>;

        try {
            const partialValidator = gameValidator.omit({ id: true });
            gameData = partialValidator.parse(game) as Omit<Game, 'id'>;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const messages = err.issues.map(issue => `${issue.code} - ${issue.message}`).join(', ');
                throw new HttpError(`Validation failed: ${messages}`, 400);
            }
            throw new HttpError('Unknown error during validation', 500);
        }

        return this.repo.update(id, gameData);
    }

    async deleteGame(id: string): Promise<void> {
        return this.repo.delete(id);
    }
}
