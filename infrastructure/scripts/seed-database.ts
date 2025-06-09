import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
initializeApp({
    projectId: "demo-project"
});

const db: Firestore = getFirestore();
db.settings({
    host: '0.0.0.0:9081',
    ssl: false,
});

const dataFilePath = 'data/games.json';
const COLLECTION_NAME = 'games';

async function seedFirestore() {
    try {
        const rawData = fs.readFileSync(dataFilePath, 'utf-8');
        const data = JSON.parse(rawData);

        const batch = db.batch();

        data.forEach((item: any) => {
            const docRef = db.collection(COLLECTION_NAME).doc(item.id);
            batch.set(docRef, item);
        });

        await batch.commit();
        console.log(`Seeded ${data.length} documents to "${COLLECTION_NAME}" in the Firestore emulator.`);
    } catch (error) {
        console.error('Error seeding Firestore:', error);
    }
}

seedFirestore();
