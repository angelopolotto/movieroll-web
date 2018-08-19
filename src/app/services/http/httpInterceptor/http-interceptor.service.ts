import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {MessageService} from '../../message/message.service';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Token, UserStates} from '../../../models/api/user';
import {ConfirmDialogData} from '../../../models/messages';
import {ConfimDialogResult} from '../../../dialogs/confirm/confirm-dialog.component';
import {Router} from '@angular/router';
import {fromPromise} from 'rxjs/internal-compatibility';
import {switchMap} from 'rxjs/operators';
import {empty} from 'rxjs/internal/Observer';
import {DialogService} from '../../dialog/dialog.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor  {
  private publicTokenRegex = /\/genres\/|\/discover/;
  private privateTokenRegex = /\/favorites|\/user/;

  constructor(public messageService: MessageService,
              public dialogService: DialogService,
              public authService: AuthService,
              public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      // Handle offline error
      this.dialogService.showError('No Internet Connection');
      return this.cancelResponse();
    }

    const obs = next.handle(req);
    if (req.url.match(this.privateTokenRegex)) { // add private token to request
      console.log('HttpInterceptorService getHttpPrivateTokenOptions');
      if (this.authService.isLogged()) {
        return this.generateResponse(obs, this.authService.getHttpPrivateTokenOptions(), req, next);
      } else {
        return this.cancelResponse();
      }
    } else if (req.url.match(this.publicTokenRegex)) { // add public token to request
      console.log('HttpInterceptorService getHttpPublicTokenOptions');
      if (!this.authService.hasPublicToken()) {
        return fromPromise(this.initialSetupPublicToken()).pipe(
          switchMap(() => {
            return this.generateResponse(obs, this.authService.getHttpPublicTokenOptions(), req, next);
          })
        );
      } else {
        return this.generateResponse(obs, this.authService.getHttpPublicTokenOptions(), req, next);
      }
    } else { // no token to request
      console.log('HttpInterceptorService no token');
      return this.generateResponse(obs, this.authService.getHttpNoTokenOptions(), req, next);
    }
  }

  private generateResponse(obs: Observable<HttpEvent<any>>,
                             httpOption: any = null,
                             req: HttpRequest<any> = null,
                             next: HttpHandler = null):  Observable<HttpEvent<any>> {
    if (httpOption !== null && req !== null && next !== null) {
      const authReq = req.clone(httpOption);
      obs = next.handle(authReq);
    }
    return obs;
  }

  private cancelResponse() {
    this.dialogService.progress(false);
    return Observable.create(empty);
  }

  private async initialSetupPublicToken(): Promise<Token> {
    return await this.authService.publicToken(this.messageService.selectedLanguage);
  }
}
