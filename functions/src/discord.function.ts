import * as functions from 'firebase-functions';
import { db } from './index';
const fetch = require('node-fetch');

export const sendFailureResult = functions
  .region('asia-northeast1')
  .firestore.document(`tasks/{taskId}`)
  .onUpdate(async (change) => {
    const data = change.after.data();
    if (data.status !== 'failure') {
      return;
    } else {
      const userData = (await db.doc(`users/${data.uid}`).get()).data();
      if (userData) {
        const message =
          userData.name + 'さんが' + data.title + 'に失敗しました...';
        const body = {
          username: userData.name,
          content: message,
          avatar_url: userData.avatarURL,
          embeds: [
            {
              image: {
                url:
                  'https://firebasestorage.googleapis.com/v0/b/pridetimer.appspot.com/o/images%2FF3F0FF7E-E4A9-454C-B867-506EFC825D99_4_5005_c.jpeg?alt=media&token=577da38d-609f-48de-8658-a0db9f5e707b',
              },
            },
          ],
        };

        fetch(userData.webhookURL, {
          method: 'post',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
  });
