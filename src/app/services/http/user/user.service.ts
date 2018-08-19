import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {UserProfile, UserStates} from '../../../models/api/user';
import {environment} from '../../../../environments/environment';
import {GenericResponse} from '../../../models/response';
import {FeedItem} from '../../../models/api/feedItem';
import {DialogService} from '../../dialog/dialog.service';

@Injectable()
export class UserService {

  constructor(public authService: AuthService,
              public http: HttpClient,
              public dialogService: DialogService) {
  }

  public async getUser(): Promise<UserProfile> {
    console.log('UserService userProfile started');
    const userProfile = await this.dialogService.wrapPromise(this.http.get<UserProfile>(
      environment.apiUrls.user
        .replace('{{user_id}}', `${this.authService.userProfile.user_id}`))
    );
    this.authService.setUserState(UserStates.Logged);
    return userProfile;
  }

  public async deleteUser(): Promise<GenericResponse> {
    console.log('UserService deleteUser started');
    const response = await this.dialogService.wrapPromise(this.http.delete<GenericResponse>(
      environment.apiUrls.user
        .replace('{{user_id}}', `${this.authService.userProfile.user_id}`)));
    this.authService.setUserState(UserStates.Unlogged);
    return response;
  }

  public async updateUser(userprofile: UserProfile): Promise<UserProfile> {
    console.log('UserService updateUser started');
    const response = await this.dialogService.wrapPromise(this.http.put<UserProfile>(
      environment.apiUrls.user
        .replace('{{user_id}}', `${this.authService.userProfile.user_id}`),
      userprofile));
    this.authService.setUserState(UserStates.Logged);
    return response;
  }

  public async addFavorites(feedItem: FeedItem): Promise<GenericResponse> {
    console.log('UserService addFavorites started');
    return this.authService.authCheckWrap(async () => {
      return await this.dialogService.wrapPromise(this.http.post<GenericResponse>(
        environment.apiUrls.favorites.replace('{{movie_id}}', `${feedItem.media_id}`),
        feedItem));
    });
  }

  public async deleteFavorites(feedItem: FeedItem): Promise<GenericResponse> {
    console.log('UserService addFavorites started');
    return await this.dialogService.wrapPromise(this.http.delete<GenericResponse>(
      environment.apiUrls.favorites
        .replace('{{movie_id}}', `${feedItem.media_id}`)));
  }

  public async getFavorites(): Promise<FeedItem[]> {
    console.log('UserService addFavorites started');
    return await this.dialogService.wrapPromise(this.http.get<FeedItem[]>(
      environment.apiUrls.favoritesGet));
  }

  public async getWatchedList(): Promise<FeedItem[]> {
    console.log('UserService addFavorites started');
    return await this.dialogService.wrapPromise(this.http.get<FeedItem[]>(
      environment.apiUrls.favoritesWatchedGet));
  }
}
