import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../interfaces/task';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    public afAuth: AngularFireAuth
  ) {}

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
}
