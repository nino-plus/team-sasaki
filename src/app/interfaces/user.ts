export interface User {
  avatarURL: string;
  uid: string;
  name: string;
  point: number;
  email: string;
  latestCreatedTaskDate: firebase.default.firestore.Timestamp;
  webhookURL: string;
}
