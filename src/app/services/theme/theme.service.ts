import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ThemeService {
  public readonly themes = [
    {value: 'deeppurple-theme', viewValue: 'Deep purple'},
    {value: 'indigo-theme', viewValue: 'Indigo'},
    {value: 'pink-theme', viewValue: 'Pink'},
    {value: 'purple-theme', viewValue: 'Purple'}];
  public readonly defaultTheme = this.themes[0];

  public primary = 'rgb(255, 0, 0)';
  public accent = 'rgb(255, 0, 0)';
  public warn = 'rgb(255, 0, 0)';
  public selectedTheme = this.themes[0];
  public OnThemeChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  public onSetTheme(value: string) {
    this.selectedTheme = this.themes.find((obj) => obj.value === value);
    console.log(`ThemeService onSetTheme: ${JSON.stringify(this.selectedTheme)}`);
    this.OnThemeChange.emit(this.selectedTheme.value);
  }
}
