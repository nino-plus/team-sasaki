export interface Task {
  title: string;
  detail: string;
  timeLimit: number;
  createdAt: firebase.default.firestore.Timestamp;
  uid: string;
  taskId: string;
  status: 'active' | 'success' | 'failure';
}
