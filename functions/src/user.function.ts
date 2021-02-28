import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { db, bucket } from './index';

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
    }, {merge: true});
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

export const deleteAfUser = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    return admin.auth().deleteUser(data);
  });

export const deleteUserData = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    const promise1 = deleteUserImage(user);
    const promise2 = deleteUserInfo(user);
    const promise3 = deleteUserTasks(user);
    return Promise.all([promise1, promise2, promise3]);
  });

function deleteUserImage(user: admin.auth.UserRecord) {
  return bucket.deleteFiles({
    prefix: `users/${user.uid}`,
  });
}

function deleteUserInfo(user: admin.auth.UserRecord) {
  return db.doc(`users/${user.uid}`).delete();
}

function deleteUserTasks(user: admin.auth.UserRecord) {
  const query = db.collection('tasks').where('uid', '==', `${user.uid}`);
  return query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      return doc.ref.delete();
    });
  });
}
