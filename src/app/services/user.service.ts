import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { shareReplay, switchMap } from 'rxjs/operators';
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

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  getUser(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }
}
