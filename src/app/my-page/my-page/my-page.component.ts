import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CropComponent } from '../crop/crop.component';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit, OnDestroy {
  user$: Observable<User> = this.userService.user$;
  userName = new FormControl('', Validators.required);
  isUpdated = false;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe((user) => {
      this.userName.setValue(user.name);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  nameChanged(): void {
    this.isUpdated = true;
  }

  updateUserName(): void {
    const newName = this.userName.value;
    this.userService.updateUserName(this.authService.uid, newName).then(() => {
      this.snackBar.open('ユーザー名が更新されました', null, {
        duration: 2000,
      });
    });
  }

  openCropDialog(event: any): void {
    const dialogRef = this.dialog.open(CropComponent, {
      data: { event },
    });
  }
}
