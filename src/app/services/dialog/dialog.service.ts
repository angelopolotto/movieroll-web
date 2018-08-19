import { Injectable } from '@angular/core';
import {MatBottomSheet, MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {ConfimDialogResult, ConfirmDialogComponent} from '../../dialogs/confirm/confirm-dialog.component';
import {InitialSetupComponent, InitialSetupResponse} from '../../dialogs/initial-setup/initial-setup.component';
import {Language} from '../../models/api/user';
import {ConfirmDialogData} from '../../models/messages';
import {ProgressDialogComponent} from '../../dialogs/progress/progress-dialog.component';
import {catchError, finalize, timeout} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {empty} from 'rxjs/internal/Observer';

@Injectable()
export class DialogService {
  private dialogRef: MatDialogRef<ProgressDialogComponent, any>;
  private showProgressCount = 0;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 5000;
    this.snackBar.open(message, null, config);
  }

  showSuccess(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-green'];
    config.duration = 5000;
    this.snackBar.open(message, null, config);
  }

  progress(showProgress: boolean = true) {
    if (showProgress && this.showProgressCount >= 0) {
      this.showProgressCount++;
    } else if (!showProgress && this.showProgressCount >= 0) {
      this.showProgressCount--;
    }

    if (showProgress && this.showProgressCount === 1) {
      setTimeout(() =>
        this.dialogRef = this.dialog.open(ProgressDialogComponent, {
          disableClose: true
        }), 0);
    } else if (!showProgress && this.showProgressCount === 0) {
      this.dialogRef.close();
    }
  }

  async confirm(data: ConfirmDialogData): Promise<ConfimDialogResult> {
    return new Promise<ConfimDialogResult>(resolve => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === undefined) {
          result = ConfimDialogResult.Cancel;
        }
        const resultEnum = result as ConfimDialogResult;
        console.log(`Dialog result: ${resultEnum}`);
        resolve(resultEnum);
      });
    });
  }

  async initialSetup(supportedLanguages: Language[]): Promise<InitialSetupResponse> {
    return new Promise<InitialSetupResponse>(resolve => {
      const dialogRef = this.dialog.open(InitialSetupComponent, {
        width: '400px',
        disableClose: true,
        data: supportedLanguages
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        resolve(result);
      });
    });
  }

  public wrapPromise(obs: Observable<any>, timeoutMs: number = 10000): Promise<any> {
    this.progress();
    return obs
      .pipe(timeout(timeoutMs))
      .pipe(finalize(() => this.progress(false)))
      .pipe(catchError((err) => {
        this.showError(err.message);
        return Observable.create(empty);
      })).toPromise();
  }
}
