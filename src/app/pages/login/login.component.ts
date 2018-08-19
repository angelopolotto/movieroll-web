import {Component, isDevMode, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ThemeService} from '../../services/theme/theme.service';
import {AuthService} from '../../services/http/auth/auth.service';
import {Router} from '@angular/router';
import {FormErrorHandlerService} from '../../services/formErrorHandler/form-error-handler.service';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  show = false;

  constructor(public themeService: ThemeService,
              public router: Router,
              public authService: AuthService,
              public formErrorHandler: FormErrorHandlerService,
              public messageService: MessageService) {
    this.loginForm = formErrorHandler.createLoginForm();
    if (isDevMode()) {
      this.loginForm.get('email').setValue('john@email.com');
      this.loginForm.get('password').setValue('123456');
    }
  }

  async ngOnInit() {
    if (!this.authService.hasPublicToken()) {
      await this.router.navigate(['/']);
    }
  }

  toggleShow() {
    this.show = !this.show;
  }

  login() {
    console.log(`login: login clicked. User: ${this.loginForm.get('email').value} `);
    this.authService.login({email: this.loginForm.get('email').value, password: this.loginForm.get('password').value})
      .then(userProf => {
        console.log(`login successful: ${JSON.stringify(userProf)}`);
        this.router.navigate(['/dashboard']);
      });
  }
}

