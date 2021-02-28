import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent implements OnInit {
  isDelete: boolean;

  constructor(
    private authService: AuthService,
    private afn: AngularFireFunctions,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async withdrawal(): Promise<void> {
    if (this.isDelete) {
      this.authService.afAuth.signOut().then(() => {
        this.snackBar.open('退会しました');
      });
      this.router.navigateByUrl('/welcome');
      const callable = this.afn.httpsCallable('deleteAfUser');
      await callable(this.authService.uid).toPromise();
    } else {
      this.snackBar.open(
        '退会する場合はチェックボックスにチェックを入れてください'
      );
    }
  }
}
