import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TaskService } from '../services/task.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { ButtonService } from '../services/button.service';

@Component({
  selector: 'app-giveup-dialog',
  templateUrl: './giveup-dialog.component.html',
  styleUrls: ['./giveup-dialog.component.scss'],
})
export class GiveupDialogComponent implements OnInit {
  data$;
  taskId: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { taskId: string },
    private taskService: TaskService,
    private afn: AngularFireFunctions,
    private authService: AuthService,
    public buttonService: ButtonService
  ) {}

  ngOnInit(): void {}

  fail() {
    this.buttonService.processing = true;
    this.taskService.updateTaskStatusFailure(this.data.taskId);
    const callable = this.afn.httpsCallable('subtractPoint');
    return callable({})
      .toPromise()
      .then(() => {
        this.buttonService.processing = false;
      });
  }
}
