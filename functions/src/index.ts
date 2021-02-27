import * as admin from 'firebase-admin';
admin.initializeApp();
export const db = admin.firestore();
export const bucket = admin.storage().bucket();

export * from './discord.function';
export * from './user.function';
