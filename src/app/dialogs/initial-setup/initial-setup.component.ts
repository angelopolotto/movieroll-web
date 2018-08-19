import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormErrorHandlerService} from '../../services/formErrorHandler/form-error-handler.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ThemeService} from '../../services/theme/theme.service';
import {Language} from '../../models/api/user';
import {ConfimDialogResult} from '../confirm/confirm-dialog.component';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.component.html',
  styleUrls: ['./initial-setup.component.scss']
})
export class InitialSetupComponent implements OnInit {
  initialSetupForm: FormGroup;
  supportedLanguages: Language[];

  constructor(public formErrorHandler: FormErrorHandlerService,
              public themeService: ThemeService,
              public dialogRef: MatDialogRef<InitialSetupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Language[]) {
    this.initialSetupForm = this.formErrorHandler.createInitialSetupForm();
    this.supportedLanguages = data;
  }

  async ngOnInit() {
  }

  okClick() {
    const languageObj = this.supportedLanguages.find((obj) =>
      obj.languageCode === this.initialSetupForm.get('language').value);
    this.dialogRef.close({
      language: languageObj,
      theme: this.initialSetupForm.get('theme').value
    });
  }
}

export interface InitialSetupResponse {
  language: Language;
  theme: string;
}
