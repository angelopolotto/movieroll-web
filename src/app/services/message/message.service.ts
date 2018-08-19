import { Injectable } from '@angular/core';
import {TextErrors, TextDashboard, TextMessages, TextRegister, TextLogin, TextMenus, TextUser} from '../../models/texts';
import {supported} from '../../languages/supported';
import {dashboard} from '../../languages/dashboard';
import {messages} from '../../languages/messages';
import {errors} from '../../languages/errors';
import {login} from '../../languages/login';
import {register} from '../../languages/register';
import {menus} from '../../languages/menus';
import {user} from '../../languages/user';
import {Language} from '../../models/api/user';
import {LocalStorage, SharedStorage} from 'ngx-store';

@Injectable()
export class MessageService {
  @LocalStorage() public selectedLanguage: Language;
  @SharedStorage() genreParam: string = null;
  @SharedStorage() mediaParam: string = null;

  public textsDashboard: TextDashboard = dashboard[0];
  public textsMessages: TextMessages = messages[0];
  public textsErrors: TextErrors = errors[0];
  public textsLogin: TextLogin = login[0];
  public textsRegister: TextRegister = register[0];
  public textsMenus: TextMenus = menus[0];
  public textsUser: TextUser = user[0];

  constructor() {}

  changeLanguageTexts(language: Language = this.selectedLanguage): void {
    this.selectedLanguage = language;
    this.textsDashboard = this.languageTexts(language, dashboard);
    this.textsMessages = this.languageTexts(language, messages);
    this.textsLogin = this.languageTexts(language, login);
    this.textsRegister = this.languageTexts(language, register);
    this.textsErrors = this.languageTexts(language, errors);
    this.textsMenus = this.languageTexts(language, menus);
    this.textsUser = this.languageTexts(language, user);
  }

  supportedLanguages(): Language[] {
    return supported;
  }

  languageTexts(language: Language, textsArray: any[]): any {
    return textsArray.find(obj =>
      obj.languageCode.toLowerCase()
      === language.languageCode.toLowerCase());
  }

  findLanguage(language: string, region: string): any {
    return supported.find(obj =>
      obj.language.toLowerCase() === language.toLowerCase()
        && obj.region.toLowerCase() === region.toLowerCase());
  }

  hasSelectedLanguage(): boolean {
    return this.selectedLanguage !== null;
  }
}
