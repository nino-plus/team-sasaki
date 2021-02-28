import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<User> = this.afAuth.user.pipe(
    switchMap((afUser) => {
      if (afUser?.uid) {
        return this.getUser(afUser.uid);
      } else {
        return of(undefined);
      }
    }),
    shareReplay(1)
  );
  bestUsers$: Observable<User[]> = this.getBestOrWorstTenUsers('best');
  worstUsers$: Observable<User[]> = this.getBestOrWorstTenUsers('worst');

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
  ) { }

  updateUser(user: Partial<User>): Promise<void> {
    const uid = this.authService.uid;
    return this.db.doc(`users/${uid}`).set(
      {
        uid,
        ...user,
      },
      { merge: true }
    );
  }

  getUser(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  getBestOrWorstTenUsers(type: 'best' | 'worst'): Observable<User[]> {
    return this.db
      .collection<User>('users', (ref) => {
        return ref.orderBy('point', type === 'best' ? 'desc' : 'asc').limit(10);
      })
      .valueChanges();
  }

  async updateAvatar(uid: string, base64Image: string): Promise<void> {
    const ref = this.storage.ref(`users/${uid}`);
    const uploadTask = await ref.putString(base64Image, 'data_url', {
      contentType: 'image/png',
    });
    const imageURL = await uploadTask.ref.getDownloadURL();

    this.db.doc<User>(`users/${uid}`).update({
      avatarURL: imageURL,
    });
  }

  updateUserName(uid: string, newName: string): Promise<void> {
    return this.db.doc<User>(`users/${uid}`).update({
      name: newName,
    });
  }
}
