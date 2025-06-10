import type { CollectionReference, Firestore } from 'firebase-admin/firestore';

import { Game } from "../models/game";

export class GamesRepository {
    private collection: CollectionReference;

    constructor(firestore: Firestore) {
        this.collection = firestore.collection('games');
    }

    async getAll(): Promise<Game[]> {
        try {
            const snapshot = await this.collection.get();
            const docs = snapshot.docs.sort((a, b) => Number(a.id) - Number(b.id));

            return docs.map(doc => doc.data() as Game);
        } catch (error) {
            throw new Error(`Error while fetching games from Firestore: ${error}`);
        }
    }

    async getById(id: string): Promise<Game | null> {
        try {
            const doc = await this.collection.doc(id).get();

            if (!doc.exists) {
                return null;
            }

            return doc.data() as Game;
        } catch (error) {
            throw new Error(`Error while fetching game from Firestore: ${error}`);
        }
    }

    async create(game: Game): Promise<Game> {
        try {
            const docRef = this.collection.doc(game.id);
            const existing = await docRef.get();

            if (existing.exists) {
                throw new Error('A game with that ID already exists');
            }

            await docRef.set(game);

            return game;
        } catch (error) {
            throw new Error(`Error while saving game from Firestore: ${error}`);
        }
    }

    async update(id: string, game: Omit<Game, 'id'>): Promise<Game> {
        try {
            const docRef = this.collection.doc(id);
            const existing = await docRef.get();

            if (!existing.exists)
                throw new Error(`Game not found to update with ID '${id}'`)

            const newData: Game = { ...game, id };

            await docRef.set(newData);
            return newData;
        } catch (error) {
            throw new Error(`Error while updating game: ${error}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const docRef = this.collection.doc(id);
            const existing = await docRef.get();

            if (!existing.exists)
                throw new Error(`Game not found to update with ID '${id}'`)

            await docRef.delete();
            return;
        } catch (error) {
            throw new Error(`Error while deleting game: ${error}`);
        }
    }
}
