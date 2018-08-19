import {Component, ElementRef, HostBinding, isDevMode, OnInit, ViewChild} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ThemeService} from './services/theme/theme.service';
import {MessageService} from './services/message/message.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  @ViewChild('primary') primary: ElementRef;
  @ViewChild('accent') accent: ElementRef;
  @ViewChild('warn') warn: ElementRef;
  @HostBinding('class') componentCssClass;

  constructor(public overlayContainer: OverlayContainer,
              public themeService: ThemeService,
              public messageService: MessageService,
              private router: Router) {
    this.themeService.OnThemeChange.subscribe((theme) => this.onSetTheme(theme));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).gtag('set', 'page', event.urlAfterRedirects);
        (<any>window).gtag('send', 'pageview');
      }
    });
  }

  async ngOnInit() {
    // override all console.log methods to avoid print in production mode
    if (!isDevMode()) {
      console.log = (...args) => {};
    }
    this.updatePrimaryColor();
  }

  public onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    console.log(theme);
    setTimeout(() => this.updatePrimaryColor(), 50);
  }

  private updatePrimaryColor() {
    this.themeService.primary = getComputedStyle(this.primary.nativeElement).color;
    this.themeService.accent = getComputedStyle(this.accent.nativeElement).color;
    this.themeService.warn = getComputedStyle(this.warn.nativeElement).color;
    console.log('login componente primary color ' + this.themeService.primary);
  }
}
