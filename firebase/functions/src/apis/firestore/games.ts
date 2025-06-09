import { getFirestore } from './getFirestore.js';
import { memoize } from '../../utils/memoize.js';
import { HttpError } from '../../classes/HttpError.js';
import { Game } from '../../models/game.js';

const getCollection = memoize(() =>
  getFirestore().collection('games'),
);

export async function getGames() {
  try {
    const result = await getCollection().get();
    return result.docs.map((snap) => snap.data());
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
    throw new HttpError('Error while saving game', 500);
  }
}