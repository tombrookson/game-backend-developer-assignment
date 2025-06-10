import { wrapAsync, createRouter } from '../../../utils/index.js';
import { HttpError } from '../../../exceptions/HttpError.js';

import { GamesRepository } from '../../../repositories/gamesRepository.js';
import { GamesService } from '../../../services/gamesService.js';
import { getFirestore } from '../../../apis/firebase.js';

const firestore = getFirestore();

const repo = new GamesRepository(firestore);
const service = new GamesService(repo);

export const gamesRouter = createRouter();

gamesRouter.get(
    '/',
    wrapAsync(() => service.getGames()),
);

gamesRouter.get(
    '/:id',
    wrapAsync(async (req) => {
        const { id } = req.params;

        if (!id) {
            throw new HttpError("An id must be provided in the request", 400);
        }

        const game = await service.getGameById(id);
        if (!game) {
            throw new HttpError(`Game with id '${id}' not found`, 404);
        }

        return game;
    }),
);

gamesRouter.post(
    '/',
    wrapAsync(async (req) => {
        return {
            message: 'Game created',
            game: await service.createGame(req.body),
        };
    }),
);

gamesRouter.put(
    '/:id',
    wrapAsync(async (req) => {
        const { id } = req.params;
        if (!id) {
            throw new HttpError("An id must be provided in the request", 400);
        }

        return {
            message: 'Game updated',
            game: await service.updateGame(id, req.body),
        };
    }),
);

gamesRouter.delete(
    '/:id',
    wrapAsync(async (req) => {
        const { id } = req.params;

        if (!id) {
            throw new HttpError("An id must be provided in the request", 400);
        }

        await service.deleteGame(id);
        return { message: 'Game deleted' };
    }),
);
