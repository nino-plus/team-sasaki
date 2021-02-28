import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rank-card',
  templateUrl: './rank-card.component.html',
  styleUrls: ['./rank-card.component.scss']
})
export class RankCardComponent implements OnInit {
  @Input() user: User;
  @Input() rankingNumber: number;
  @Input() rankingType: 'best' | 'worst';

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
