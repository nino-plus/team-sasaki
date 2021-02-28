import { Component, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  @ViewChild('element') element: HTMLElement;

  isPcScreen: boolean;

  constructor(
    private uiService: UiService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.isPcScreen = this.uiService.isLargeScreen(this.element);
  }

}
