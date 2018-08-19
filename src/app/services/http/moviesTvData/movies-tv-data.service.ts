import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Feed} from '../../../models/api/feed';
import {Genre} from '../../../models/api/genre';
import {DialogService} from '../../dialog/dialog.service';

@Injectable()
export class MoviesTvDataService {
  constructor(public http: HttpClient,
              public dialogService: DialogService) {
  }

  public async genresMovies(): Promise<Genre[]> {
    console.log('moviesTvData genresMovies started');
    return await this.dialogService.wrapPromise(this.http.get<Genre[]>(
      environment.apiUrls.genresMovie));
  }

  public async genresTv(): Promise<Genre[]> {
    console.log('moviesTvData genresTv started');
    return await this.dialogService.wrapPromise(this.http.get<Genre[]>(
      environment.apiUrls.genresTv));
  }

  public async discoverMovie(genreId: number, page: number): Promise<Feed> {
    console.log('moviesTvData genresMovies started');
    return await this.dialogService.wrapPromise(this.http.get<Feed>(
      environment.apiUrls.discoverMovie.replace('{{genre_id}}', genreId.toString())
        .replace('{{page}}', page.toString())));
  }

  public async discoverTv(genreId: number, page: number): Promise<Feed> {
    console.log('moviesTvData genresMovies started');
    return await this.dialogService.wrapPromise(this.http.get<Feed>(
      environment.apiUrls.discoverTv.replace('{{genre_id}}', genreId.toString())
        .replace('{{page}}', page.toString())));
  }
}
