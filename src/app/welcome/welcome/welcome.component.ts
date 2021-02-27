import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user$ = this.userService.user$;
  afUser$ = this.authService.afUser$;

  constructor(
    public authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }
}
