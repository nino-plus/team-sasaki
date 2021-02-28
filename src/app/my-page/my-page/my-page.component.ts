import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CropComponent } from '../crop/crop.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

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
    this.dialog.open(CropComponent, {
      data: { event },
      autoFocus: false
    });
  }

  openDeleteUserDialog(): void {
    this.dialog.open(DeleteUserDialogComponent, {
      autoFocus: false,
      width: '400px',
    });
  }
}
