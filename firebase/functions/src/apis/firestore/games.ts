import { getFirestore } from './getFirestore.js';
import { memoize } from '../../utils/memoize.js';
import { HttpError } from '../../classes/HttpError.js';
import { Game } from '../../models/game.js';

const getCollection = memoize(() =>
  getFirestore().collection('games'),
);

export async function getGames(): Promise<Game[]> {
  try {
    const result = await getCollection().get();
    return result.docs.map((snap) => {
      return snap.data() as Game;
    });
  } catch (error) {
    throw new HttpError('Error while fetching games', 500);
  }
}

export async function getGameById(id: string): Promise<Game | null> {
  try {
    const doc = await getCollection().doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return doc.data() as Game;
  } catch (error) {
    throw new HttpError('Error while fetching game', 500);
  }
}

export async function postGame(gameData: Game): Promise<Game> {
  try {
    const docRef = getCollection().doc(gameData.id);
    const existing = await docRef.get();

    if (existing.exists) {
      throw new HttpError('A game with that ID already exists', 400);
    }

    await docRef.set(gameData);

    return gameData;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError('Error while saving game', 500);
  }
}

export async function putGame(id: string, gameData: Omit<Game, 'id'>): Promise<Game> {
  try {
    const docRef = getCollection().doc(id);
    const existing = await docRef.get();

    if (!existing.exists)
      throw new HttpError(`Game not found to update with ID '${id}'`, 404)

    const newData: Game = { ...gameData, id };

    await docRef.set(newData);
    return newData;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError('Error while updating game', 500);
  }
}

export async function deleteGame(id: string): Promise<void> {
  try {
    const docRef = getCollection().doc(id);
    const existing = await docRef.get();

    if (!existing.exists)
      throw new HttpError(`Game not found to update with ID '${id}'`, 404)

    await docRef.delete();
    return;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError('Error while deleting game', 500);
  }
}