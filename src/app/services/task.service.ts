import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../interfaces/task';
import firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private db: AngularFirestore
  ) { }

  createTask(task: Pick<Task, 'title' | 'detail' | 'timeLimit' | 'uid'>): Promise<void> {
    const taskId = this.db.createId();
    return this.db.doc<Task>(`tasks/${taskId}`).set({
      ...task,
      createdAt: firebase.firestore.Timestamp.now(),
      taskId,
      status: 'active'
    });
  }
}
