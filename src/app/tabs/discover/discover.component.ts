import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MoviesTvDataService} from '../../services/http/moviesTvData/movies-tv-data.service';
import {Genre} from '../../models/api/genre';
import {MessageService} from '../../services/message/message.service';
import {FeedItem} from '../../models/api/feedItem';
import {AuthService} from '../../services/http/auth/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public genresMovies: Genre[];
  public genresTv: Genre[];

  @Output()
  OnResult: EventEmitter<{media_type: string; genre: Genre}> = new EventEmitter();

  constructor(public movieTvDataService: MoviesTvDataService,
              public messageService: MessageService,
              public authService: AuthService,
              public route: ActivatedRoute) { }

  async ngOnInit() {
    if (this.authService.hasPublicToken()) {
      this.genresMovies = await this.movieTvDataService.genresMovies();
      this.genresTv = await this.movieTvDataService.genresTv();

      this.messageService.mediaParam = this.route.snapshot.paramMap.get('media');
      this.messageService.genreParam = this.route.snapshot.paramMap.get('genre');
      if (this.messageService.mediaParam  && this.messageService.genreParam) {
        console.log(this.messageService.mediaParam);
        console.log(this.messageService.genreParam);
      }
    }
  }

  public discoverMovies(genre: Genre) {
    this.OnResult.emit({media_type: 'movie', genre: genre});
  }

  public discoverTv(genre: Genre) {
    this.OnResult.emit({media_type: 'tv', genre: genre});
  }
}
