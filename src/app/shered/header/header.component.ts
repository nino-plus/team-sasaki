import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { UiService } from 'src/app/services/ui.service';
import { TaskService } from 'src/app/services/task.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isWelcomePage?: boolean;
  isPcScreen: boolean = this.uiService.isLargeScreen();
  tasks$ = this.taskService.getActiveTask();

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private dialog: MatDialog,
    private uiService: UiService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {}

  openCreateTaskDialog(): void {
    this.dialog.open(CreateTaskDialogComponent, {
      width: '800px',
      autoFocus: false,
    });
  }
}
