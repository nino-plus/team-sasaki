import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CropComponent } from '../crop/crop.component';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit, OnDestroy {
  user$: Observable<User> = this.userService.user$;
  isUpdated = false;
  subscription: Subscription;

  form: FormGroup = this.fb.group({
    userName: ['', [Validators.required]],
    webHookURL: ['', [Validators.required]]
  });

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private fb: FormBuilder,
    private afn: AngularFireFunctions,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe((user) => {
      this.form.patchValue({
        userName: user.name,
        webHookURL: user.webhookURL
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  nameChanged(): void {
    this.isUpdated = true;
  }

  updateUserName(): void {
    const formData = this.form.value;
    const userData: Partial<User> = {
      uid: this.authService.uid,
      name: formData.userName,
      webhookURL: formData.webHookURL
    };

    this.userService.updateUser(userData).then(() => {
      this.snackBar.open('ユーザー名が更新されました', null, {
        duration: 2000,
      });
    });
  }

  openCropDialog(event: any): void {
    const dialogRef = this.dialog.open(CropComponent, {
      data: { event },
      autoFocus: false
    });
  }

  async withdrawal(): Promise<void> {
    const callable = this.afn.httpsCallable('deleteAfUser');
    await callable(this.authService.uid)
      .toPromise();
    this.router.navigateByUrl('/welcome');
    this.authService.afAuth.signOut().then(() => {
      this.snackBar.open('退会しました');
    });
  }
}
