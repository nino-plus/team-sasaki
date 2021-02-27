import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, CanLoad, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  loginCheck(): Observable<boolean> {
    return this.afAuth.user.pipe(
      map((user) => !!user),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/welcome');
        }
      })
    );
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loginCheck();
    }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.loginCheck().pipe(take(1));
    }
}
