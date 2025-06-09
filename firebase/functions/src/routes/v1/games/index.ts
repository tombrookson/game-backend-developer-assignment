import { wrapAsync, createRouter } from '../../../utils/index.js';
import { getGames, getGameById, postGame } from '../../../apis/firestore/games.js';
import { HttpError } from '../../../classes/HttpError.js';
import { gameValidator } from '../../../validators/game.js';
import { Game } from '../../../models/game.js';
import { z } from 'zod';

export const gamesRouter = createRouter();

gamesRouter.get(
  '/',
  wrapAsync(() => getGames()),
);

gamesRouter.get(
  '/:id',
  wrapAsync(async (req) => {
    const { id } = req.params;

    if (!id) {
      throw new HttpError("An id must be provided in the request", 400);
    }

    const game = await getGameById(id);

    if (!game) {
      throw new HttpError(`Game with id '${id}' not found`, 404);
    }

    return game;
  }),
);

gamesRouter.post(
  '/',
  wrapAsync(async (req) => {
    let gameData: Game;

    try {
      gameData = gameValidator.parse(req.body) as Game;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const messages = err.issues.map(issue => issue.message).join(', ');
        throw new HttpError(`Validation failed: ${messages}`, 400);
      }
      throw new HttpError('Unknown error during validation', 500);
    }

    const game = await postGame(gameData);
    return { message: 'Game created', game };
  }),
);