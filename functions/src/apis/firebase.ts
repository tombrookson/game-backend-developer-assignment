import type { App } from 'firebase-admin/app';
import { initializeApp } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';
import { getFirestore as createFirestore } from 'firebase-admin/firestore';
import { memoize } from '../utils';

export const getApp = memoize((): App => {
    const app = initializeApp();
    return app;
});

export const getFirestore = memoize((): Firestore => createFirestore(getApp()));
