import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  readonly nameMaxLength = 60;

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
  ) {
  }

  ngOnInit(): void {
  }

  webhookURLValidator(formControl: AbstractControl): {webhookURLValidator: boolean} {
    const webhookURL: string = formControl.value;
    if (!webhookURL) {
      return null;
    }
    return /(http(s)?:\/\/discord.com\/api\/webhooks\/[a-zA-Z0-9-.!'()*;/?:@&=+$,%#-_]+)/gi
      .test(formControl.value) ? null : { webhookURLValidator: true } ;
  }

  async onSubmit(): Promise<void> {
    this.inProgress = true;
    const formData =  this.form.value;
    const currentUserData = await this.userService.user$.pipe(take(1)).toPromise();
    this.userService.updateUser(currentUserData, formData)
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
