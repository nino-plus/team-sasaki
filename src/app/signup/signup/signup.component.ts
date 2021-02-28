import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  readonly nameMaxLength = 60;

  subscription: Subscription;
  isLoading = false;
  currentUserData: User;
  inProgress = false;
  form = this.fb.group({
    avatarURL: [''],
    name: ['', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
    webhookURL: [
      '',
      [Validators.required, this.webhookURLValidator],
    ],
  });

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get webhookURLControl(): FormControl {
    return this.form.get('webhookURL') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe((currentUserData) => {
      if (currentUserData) {
        this.currentUserData = currentUserData;
        this.form.patchValue(currentUserData);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  webhookURLValidator(formControl: AbstractControl): { webhookURLValidator: boolean } {
    const webhookURL: string = formControl.value;
    if (!webhookURL) {
      return null;
    }
    return /(http(s)?:\/\/discord.com\/api\/webhooks\/[a-zA-Z0-9-.!'()*;/?:@&=+$,%#-_]+)/gi
      .test(formControl.value) ? null : { webhookURLValidator: true } ;
  }

  onSubmit(): void {
    this.inProgress = true;
    const formData = this.form.value;
    this.userService.updateUser(formData)
      .then(() => {
        this.inProgress = false;
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        this.inProgress = false;
        this.snackBar.open('エラーです。もう一度やり直してください。');
        console.error(error);
      });
  }
}
