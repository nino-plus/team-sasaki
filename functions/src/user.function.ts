import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { db } from './index';

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    return db.doc(`users/${user.uid}`).set({
      avatarURL: user.photoURL,
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      point: 0,
      latestCreatedTaskDate: admin.firestore.Timestamp.now(),
    });
  });

export const addPoint = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '認証が必要です'
      );
    } else {
      const increment = admin.firestore.FieldValue.increment(100);
      return db.doc(`users/${context.auth.uid}`).update({
        point: increment,
      });
    }
  });

export const subtractPoint = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '認証が必要です'
      );
    } else {
      const decrement = admin.firestore.FieldValue.increment(-500);
      return db.doc(`users/${context.auth.uid}`).update({
        point: decrement,
      });
    }
  });
