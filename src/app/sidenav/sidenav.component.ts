import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GiveupDialogComponent } from '../giveup-dialog/giveup-dialog.component';
import { FinishDialogComponent } from '../finish-dialog/finish-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  Istask: boolean = true;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  openGiveupDialog() {
    const dialogRef = this.dialog.open(GiveupDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('タスクを諦めました😭');
      }
    });
  }
  openFinishDialog() {
    const dialogRef = this.dialog.open(FinishDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('タスクを完了しました🎉');
      }
    });
  }
}
