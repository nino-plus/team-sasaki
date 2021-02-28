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
        const messageSetting = `l_text:Roboto_60_bold:${message},co_rgb:252525,w_800,c_fit/`;
        const imageUrl =
          'https://res.cloudinary.com/demccsjrb/image/upload/' +
          messageSetting +
          'v1614486536/images/dokuro_backgroud_2x_lkfrvf.png';
        const body = {
          username: userData.name,
          avatar_url: userData.avatarURL,
          embeds: [
            {
              image: {
                url: imageUrl,
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
