import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isPcScreen: boolean = this.uiService.isLargeScreen();

  constructor(
    private uiService: UiService
  ) { }

  ngOnInit(): void {
  }

}
