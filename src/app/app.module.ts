import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatDialogModule,
  MatPaginatorModule
} from '@angular/material';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {RegisterComponent} from './pages/register/register.component';
import {ThemeService} from './services/theme/theme.service';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {HttpInterceptorService} from './services/http/httpInterceptor/http-interceptor.service';
import {MessageService} from './services/message/message.service';
import {AuthService} from './services/http/auth/auth.service';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {FormErrorHandlerService} from './services/formErrorHandler/form-error-handler.service';
import {MoviesTvDataService} from './services/http/moviesTvData/movies-tv-data.service';
import {UserService} from './services/http/user/user.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ProgressDialogComponent } from './dialogs/progress/progress-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm/confirm-dialog.component';
import { DiscoverComponent } from './tabs/discover/discover.component';
import { FeedItemComponent } from './list/feed-item/feed-item.component';
import { DiscoverItemComponent } from './list/discover-item/discover-item.component';
import { ResultComponent } from './tabs/result/result.component';
import { InitialSetupComponent } from './dialogs/initial-setup/initial-setup.component';
import {DialogService} from './services/dialog/dialog.service';
import { UserComponent } from './pages/user/user.component';
import { FavoritesComponent } from './tabs/favorites/favorites.component';
import {WebStorageModule} from 'ngx-store';
import { SettingsComponent } from './tabs/settings/settings.component';
import { EmptyComponent } from './list/empty/empty.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/:media/:genre',
    component: DashboardComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProgressDialogComponent,
    ConfirmDialogComponent,
    DiscoverComponent,
    FeedItemComponent,
    DiscoverItemComponent,
    ResultComponent,
    InitialSetupComponent,
    UserComponent,
    FavoritesComponent,
    SettingsComponent,
    EmptyComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    OverlayModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatPaginatorModule,
    WebStorageModule
  ],
  providers: [
    ThemeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    MessageService,
    AuthService,
    MatSnackBar,
    FormErrorHandlerService,
    UserService,
    MoviesTvDataService,
    DialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProgressDialogComponent, ConfirmDialogComponent, InitialSetupComponent]
})
export class AppModule { }
