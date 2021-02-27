import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { shareReplay, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: Observable<User> = this.authService.afUser$.pipe(
    switchMap((afUser) => {
      if (afUser?.uid) {
        return this.getUser(afUser.uid);
      } else {
        return of(undefined);
      }
    }),
    shareReplay(1)
  );

  constructor(private authService: AuthService, private db: AngularFirestore) { }

  getUser(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }
}
