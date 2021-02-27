import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    return db.doc(`users/${user.uid}`).set({
      avatarURL: user.photoURL,
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    });
  });
