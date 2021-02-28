import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { shareReplay, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
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

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  updateUser(user: User, newUserData: Partial<User>): Promise<void> {
    return this.db.doc<User>(`users/${user.uid}`).set({
      ...user,
      ...newUserData
    }, { merge: true });
  }

  getUser(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  getBestOrWorstTenUsers(type: 'best' | 'worst'): Observable<User[]> {
    return this.db.collection<User>('users', ref => {
      return ref.orderBy('point', type === 'best' ? 'desc' : 'asc').limit(10)
    }).valueChanges();
  }
}
