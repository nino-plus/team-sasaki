import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-rank-card',
  templateUrl: './rank-card.component.html',
  styleUrls: ['./rank-card.component.scss']
})
export class RankCardComponent implements OnInit {
  @Input() user: User;
  @Input() rankingNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

}
