import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss'],
})
export class CropComponent implements OnInit {
  imageChangedEvent = '';
  croppedImage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: any },
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.imageChangedEvent = this.data.event;
  }

  imageCropped(imageChangedEvent: ImageCroppedEvent) {
    this.croppedImage = imageChangedEvent.base64;
  }

  updateAvatar() {
    if (this.croppedImage) {
      this.userService
        .updateAvatar(this.authService.uid, this.croppedImage)
        .then(() => {
          this.snackBar.open('プロフィール画像が更新されました', null, {
            duration: 2000,
          });
        });
    }
  }
}
