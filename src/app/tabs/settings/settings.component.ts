import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message/message.service';
import {AuthService} from '../../services/http/auth/auth.service';
import {FormErrorHandlerService} from '../../services/formErrorHandler/form-error-handler.service';
import {ThemeService} from '../../services/theme/theme.service';
import {Language} from '../../models/api/user';
import {FormGroup} from '@angular/forms';
import {DialogService} from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  registerForm: FormGroup;
  show: boolean;
  supportedLanguages: Language[] = [];

  constructor(public themeService: ThemeService,
              public messageService: MessageService,
              public formErrorHandler: FormErrorHandlerService,
              public authService: AuthService,
              public dialogService: DialogService) {
    this.registerForm = this.formErrorHandler.createRegisterForm();
  }

  ngOnInit() {
    this.supportedLanguages = this.messageService.supportedLanguages();
    if (this.authService.isLogged()) {
      this.registerForm.get('name').setValue(this.authService.userProfile.name);
      this.registerForm.get('email').setValue(this.authService.userProfile.email);
      this.registerForm.get('language').setValue(this.messageService.findLanguage(this.authService.userProfile.language,
                                                                                  this.authService.userProfile.region));
      this.registerForm.get('password').setValue('');
      this.registerForm.get('theme').setValue(this.authService.userProfile.theme);
    }
  }

  toggleShow() {
    this.show = !this.show;
  }

  update() {
    const languageObj = this.supportedLanguages.find((obj) =>
      obj.languageCode === this.registerForm.get('language').value);
    const newUser = {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      language: languageObj.language,
      region: languageObj.region,
      theme: this.registerForm.get('theme').value,
    };
    this.authService.register(newUser).then((userProf) => {
      console.log(`register successful: ${JSON.stringify(userProf)}`);
      this.dialogService.showSuccess(this.messageService.textsMessages.successUpdated);
    });
  }
}
