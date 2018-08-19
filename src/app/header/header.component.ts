import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/http/auth/auth.service';
import {UserStates} from '../models/api/user';
import {MessageService} from '../services/message/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Output()
  OnThemeChange: EventEmitter<string> = new EventEmitter();

  constructor(public authService: AuthService,
              public messageService: MessageService,
              public router: Router) {}


  logoutLocalConfig() {
    this.messageService.selectedLanguage = null;
    this.authService.logout();
    this.router.navigate(['/']);
  }

  clearLocalConfig() {
    this.messageService.selectedLanguage = null;
    this.router.navigate(['/']);
  }

  // onSetTheme(theme: string) {
  //   this.OnThemeChange.emit(theme);
  // }
}
