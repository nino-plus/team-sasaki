import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageRoutingModule } from './my-page-routing.module';
import { MyPageComponent } from './my-page/my-page.component';
import { CropComponent } from './crop/crop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [MyPageComponent, CropComponent, DeleteUserDialogComponent],
  imports: [
    CommonModule,
    MyPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ImageCropperModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class MyPageModule { }
