import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GiveupDialogComponent } from '../giveup-dialog/giveup-dialog.component';
import { FinishDialogComponent } from '../finish-dialog/finish-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  Istask: boolean = true;
  activeTask;
  createdAt: number;
  timeLimit: number;
  now: Date;
  timeLimitDate: string;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private taskService: TaskService
  ) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.taskService.getActiveTask().subscribe((tasks) => {
      if (tasks) {
        this.activeTask = tasks[0];
        this.createdAt = this.activeTask.createdAt.toDate().getTime();
        this.timeLimit = this.activeTask.timeLimit * 60000;
        const timeLimitNum = this.timeLimit + this.createdAt;
        const timeLimitDate = new Date(timeLimitNum);
        const hour = timeLimitDate.getHours();
        const minutes = timeLimitDate.getMinutes();
        this.timeLimitDate = `${hour}:${minutes}`;
      }
    });
  }

  calculateRemainingTime() {
    if (this.now) {
      const remainingTime =
        (this.timeLimit - (this.now.getTime() - this.createdAt)) / 1000;
      const hoursLeft = Math.floor(remainingTime / (60 * 60)) % 24;
      const minitesLeft = Math.floor(remainingTime / 60) % 60;
      const secondsLeft = Math.floor(remainingTime) % 60;
      const time = `${hoursLeft}:${minitesLeft}:${secondsLeft}`;
      return time;
    }
  }

  openGiveupDialog() {
    const dialogRef = this.dialog.open(GiveupDialogComponent, {
      data: { taskId: this.activeTask.taskId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('タスクを諦めました😭');
      }
    });
  }
  openFinishDialog() {
    const dialogRef = this.dialog.open(FinishDialogComponent, {
      data: { taskId: this.activeTask.taskId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('タスクを完了しました🎉');
      }
    });
  }
}
