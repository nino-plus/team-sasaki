import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  isPcScreen: boolean = this.uiService.isLargeScreen();
  value: number;
  tasks$ = this.taskService.getActiveTask();
  time;

  constructor(private uiService: UiService, private taskService: TaskService) {}

  ngOnInit(): void {}

  setSpinnerValue(value: number) {
    this.value = value;
  }

  setRemainingTime(time: string) {
    this.time = time;
  }
}
