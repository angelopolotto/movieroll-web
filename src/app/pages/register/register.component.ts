import {Component, isDevMode, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ThemeService} from '../../services/theme/theme.service';
import {FormErrorHandlerService} from '../../services/formErrorHandler/form-error-handler.service';
import {Language} from '../../models/api/user';
import {AuthService} from '../../services/http/auth/auth.service';
import {Router} from '@angular/router';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  show: boolean;
  supportedLanguages: Language[] = [];

  constructor(public themeService: ThemeService,
              public messageService: MessageService,
              public formErrorHandler: FormErrorHandlerService,
              public authService: AuthService,
              public router: Router) {
    this.registerForm = this.formErrorHandler.createRegisterForm();
    if (isDevMode()) {
      this.registerForm.get('name').setValue('John');
      this.registerForm.get('email').setValue('john@email.com');
      this.registerForm.get('language').setValue('pt_BR');
      this.registerForm.get('password').setValue('123456');
      this.registerForm.get('theme').setValue('indigo-theme');
    }
  }

  async ngOnInit() {
    this.supportedLanguages = this.messageService.supportedLanguages();
    if (!this.authService.hasPublicToken()) {
      await this.router.navigate(['/']);
    }
  }

  toggleShow() {
    this.show = !this.show;
  }

  register() {
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
      this.router.navigate(['/dashboard']);
    });
  }
}
