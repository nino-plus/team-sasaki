import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/interfaces/task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {
  isPcScreen: boolean = this.uiService.isLargeScreen();

  readonly TITLE_MAX_LENGTH = 30;
  readonly DETAIL_MAX_LENGTH = 60;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)]],
    detail: ['', Validators.maxLength(this.DETAIL_MAX_LENGTH)],
    hour: [0, [Validators.required]],
    minutes: [1, [Validators.required]]
  });

  get titleCtl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get detailCtl(): FormControl {
    return this.form.get('detail') as FormControl;
  }

  hours = new Array(8).fill(null);
  minutes = new Array(12).fill(null);
  readonly convertToHourNumber = 60;
  readonly convertToMinutesNumber = 5;

  isTimeValid: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(group => {
      if ((group.hour === 0) && (group.minutes === 0)) {
        this.isTimeValid = true;
      } else {
        this.isTimeValid = false;
      }
    });
  }

  convertToLimitTime(): number {
    const formData = this.form.value;
    const hour = formData.hour * this.convertToHourNumber;
    const minutes = formData.minutes * this.convertToMinutesNumber;
    return hour + minutes;
  }

  createTask(): void {
    const formData = this.form.value;
    const taskData: Pick<Task, 'title' | 'detail' | 'timeLimit' | 'uid'> = {
      uid: this.authService.uid,
      title: formData.title,
      detail: formData.detail,
      timeLimit: this.convertToLimitTime()
    };

    this.taskService.createTask(taskData).then(() => {
      this.snackBar.open('タスクをはじめました✨');
      this.dialogRef.close();
    });
  }
}
