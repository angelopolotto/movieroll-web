import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Language, Token, UserLogin, UserProfile, UserRegister, UserStates} from '../../../models/api/user';
import {environment} from '../../../../environments/environment';
import {DialogService} from '../../dialog/dialog.service';
import {ConfimDialogResult} from '../../../dialogs/confirm/confirm-dialog.component';
import {MessageService} from '../../message/message.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorage} from 'ngx-store';
import {ThemeService} from '../../theme/theme.service';

@Injectable()
export class AuthService {
  @LocalStorage() userProfile: UserProfile;

  public state: UserStates = UserStates.Unlogged;
  private publicTokenReceived: string = null;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };

  constructor(public http: HttpClient,
              public messageService: MessageService,
              public dialogService: DialogService,
              public router: Router,
              public themeService: ThemeService) {
  }

  public getHttpNoTokenOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
      })
    };
  }

  public getHttpPrivateTokenOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.userProfile.token}`
      })
    };
  }

  public getHttpPublicTokenOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.publicTokenReceived}`
      })
    };
  }

  public logout() {
    console.log('auth logout started');
    this.state = UserStates.Unlogged;
    this.userProfile = null;
  }

  public async login(user: UserLogin): Promise<UserProfile> {
    console.log('auth login started');
    this.userProfile = await this.dialogService.wrapPromise(
      this.http.post<UserProfile>(environment.apiUrls.login, user, this.httpOptions)
    );
    this.logTheUser();
    return this.userProfile;
  }

  public async register(user: UserRegister): Promise<UserProfile> {
    console.log('auth register started');
    this.userProfile = await this.dialogService.wrapPromise(this.http.post<UserProfile>(
      environment.apiUrls.register, user, this.httpOptions)
    );
    this.logTheUser();
    return this.userProfile;
  }

  private logTheUser() {
    this.state = UserStates.Logged;
    const langObj = this.messageService.findLanguage(this.userProfile.language, this.userProfile.region);
    this.messageService.changeLanguageTexts(langObj);
    this.themeService.onSetTheme(this.userProfile.theme);
  }

  public async refreshToken(token: string): Promise<Token> {
    console.log('auth refreshToken started');
    const tokenReceived: Token = await this.dialogService.wrapPromise(this.http.post<Token>(
      environment.apiUrls.refreshToken,
      {
        token
      }, this.httpOptions)
    );
    this.userProfile.token = tokenReceived.token;
    this.logTheUser();
    return tokenReceived;
  }

  public async publicToken(language: Language): Promise<Token> {
    console.log('auth publicToken started');
    const token = await this.dialogService.wrapPromise(
      this.http.post<Token>(environment.apiUrls.publicToken, language, this.httpOptions)
    );
    this.publicTokenReceived = token.token;
    return token;
  }

  public setUserState(userState: UserStates) {
    this.state = userState;
  }

  isLogged(): boolean {
    return this.state === UserStates.Logged;
  }

  public hasPublicToken(): boolean {
    return this.publicTokenReceived !== null;
  }

  public async showDialog() {
    console.warn('AuthService checkLogged User not logged');
    let result: ConfimDialogResult;
    result = await this.dialogService.confirm(this.messageService.textsMessages.dialogNotLogged);
    switch (result) {
      case ConfimDialogResult.Yes:
        console.log('navigate to register');
        await this.router.navigate(['/register']);
        break;
      case ConfimDialogResult.No:
        console.log('navigate to login');
        await this.router.navigate(['/login']);
        break;
      case ConfimDialogResult.Cancel:
        console.log('return false');
        break;
    }
  }

  public async authCheckWrap(callback: () => any): Promise<any> {
    if (!this.isLogged()) {
      await this.showDialog();
      return Observable.create(null);
    } else {
      return await callback();
    }
  }
}
