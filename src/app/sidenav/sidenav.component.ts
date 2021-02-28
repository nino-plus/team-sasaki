import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GiveupDialogComponent } from '../giveup-dialog/giveup-dialog.component';
import { FinishDialogComponent } from '../finish-dialog/finish-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../services/task.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  activeTask;
  limitTime: string;
  timeLimitDate;
  value: number;
  timer$: Observable<number> = new Observable((observer) => {
    const interval = setInterval(() => {
      observer.next(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  subscription: Subscription;
  time: number;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    private afn: AngularFireFunctions
  ) { }

  ngOnInit(): void {
    this.taskService.getActiveTask().subscribe((tasks) => {
      if (tasks) {
        this.activeTask = tasks[0];
        this.subscription = this.timer$.subscribe((date) => {
          this.calculateRemainingSeconds(date);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculateRemainingSeconds(date: number): Promise<void> {
    if (this.activeTask) {
      const timeLimitNum =
        this.activeTask.timeLimit * 60000 +
        this.activeTask.createdAt.toDate().getTime();
      const timeLimitDate = new Date(timeLimitNum);
      const hour = timeLimitDate.getHours();
      const minutes = timeLimitDate.getMinutes();
      this.timeLimitDate = `${hour}:${minutes}`;
      const remainingSeconds =
        (this.activeTask.timeLimit * 60000 -
          (date - this.activeTask.createdAt.toDate().getTime())) /
        1000;
      this.value = (remainingSeconds / (this.activeTask.timeLimit * 60)) * 100;

      if (remainingSeconds <= 0) {
        this.taskService.updateTaskStatusFailure(this.activeTask.taskId);
        const callable = this.afn.httpsCallable('subtractPoint');
        return callable({}).toPromise();
      }
      const hoursLeft = Math.floor(remainingSeconds / (60 * 60)) % 24;
      const minitesLeft = Math.floor(remainingSeconds / 60) % 60;
      const secondsLeft = Math.floor(remainingSeconds) % 60;
      const time = `${hoursLeft}:${minitesLeft}:${secondsLeft}`;
      this.limitTime = time;
    }
  }

  openGiveupDialog(): void {
    const dialogRef = this.dialog.open(GiveupDialogComponent, {
      data: { taskId: this.activeTask.taskId },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('タスクを諦めました😭');
      }
    });
  }

  openFinishDialog(): void {
    const dialogRef = this.dialog.open(FinishDialogComponent, {
      data: { taskId: this.activeTask.taskId },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('タスクを完了しました🎉');
      }
    });
  }
}
