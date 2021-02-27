import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CreateTaskComponent,
    CreateTaskDialogComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatRippleModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RouterModule
  ]
})
export class SheredModule { }
