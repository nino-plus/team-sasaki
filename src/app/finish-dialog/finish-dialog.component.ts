import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TaskService } from '../services/task.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonService } from '../services/button.service';
@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.scss'],
})
export class FinishDialogComponent implements OnInit {
  taskId: string;
  data$;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { taskId: string },
    private taskService: TaskService,
    private afn: AngularFireFunctions,
    public buttonService: ButtonService
  ) {}

  ngOnInit(): void {}

  success() {
    this.buttonService.processing = true;
    this.taskService.updateTaskStatusSuccess(this.data.taskId);
    const callable = this.afn.httpsCallable('addPoint');
    return callable({})
      .toPromise()
      .then(() => {
        this.buttonService.processing = false;
      });
  }
}
