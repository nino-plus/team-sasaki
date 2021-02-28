import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  failureTasks$: Observable<Task[]> = this.getTaskWithStatusFailure();
  successTasks$: Observable<Task[]> = this.getTaskWithStatusSuccess();

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    public afAuth: AngularFireAuth
  ) { }

  getActiveTask() {
    return this.db
      .collection('tasks', (ref) =>
        ref
          .where('uid', '==', `${this.authService.uid}`)
          .where('status', '==', 'active')
      )
      .valueChanges();
  }

  updateTaskStatusFailure(taskId: string) {
    return this.db.doc(`tasks/${taskId}`).update({
      status: 'failure',
    });
  }

  createTask(
    task: Pick<Task, 'title' | 'detail' | 'timeLimit' | 'uid'>
  ): Promise<void> {
    const taskId = this.db.createId();
    return this.db.doc<Task>(`tasks/${taskId}`).set({
      ...task,
      createdAt: firebase.firestore.Timestamp.now(),
      taskId,
      status: 'active',
    });
  }

  updateTaskStatusSuccess(taskId: string) {
    return this.db.doc(`tasks/${taskId}`).update({
      status: 'success',
    });
  }

  getTaskWithStatusFailure(): Observable<Task[]> {
    return this.db
      .collection<Task>('tasks', (ref) =>
        ref
          .where('uid', '==', this.authService.uid)
          .where('status', '==', 'failure')
      )
      .valueChanges();
  }

  getTaskWithStatusSuccess(): Observable<Task[]> {
    return this.db
      .collection<Task>('tasks', (ref) =>
        ref
          .where('uid', '==', this.authService.uid)
          .where('status', '==', 'success')
      )
      .valueChanges();
  }
}
