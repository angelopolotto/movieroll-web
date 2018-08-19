import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message/message.service';
import {AuthService} from '../../services/http/auth/auth.service';
import {Router} from '@angular/router';
import {DialogService} from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService,
              public dialogService: DialogService,
              public messageService: MessageService,
              public router: Router) { }

  async ngOnInit() {
    // refresh public token
    if (this.messageService.selectedLanguage === null) {
      const result = await this.dialogService.initialSetup(this.messageService.supportedLanguages());
      this.messageService.selectedLanguage = result.language;
    }
    await this.authService.publicToken(this.messageService.selectedLanguage);
    this.messageService.changeLanguageTexts();

    // if user already logged, refresh token
    if (this.authService.userProfile !== null) {
      await this.authService.refreshToken(this.authService.userProfile.token);
    }

    if (this.messageService.mediaParam && this.messageService.genreParam) {
      await this.router.navigate([`/dashboard/${this.messageService.mediaParam}/${this.messageService.genreParam}`]);
    } else {
      await this.router.navigate(['/dashboard']);
    }
  }
}
