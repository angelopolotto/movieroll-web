import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmDialogData} from '../../models/messages';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
  }

  ngOnInit() {
  }

  yesClick(): void {
    this.dialogRef.close(ConfimDialogResult.Yes);
  }

  noClick(): void {
    this.dialogRef.close(ConfimDialogResult.No);
  }

  cancelClick(): void {
    this.dialogRef.close(ConfimDialogResult.Cancel);
  }
}

export enum ConfimDialogResult {
  Yes,
  No,
  Cancel
}
