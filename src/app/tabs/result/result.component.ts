import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FeedItem} from '../../models/api/feedItem';
import {UserService} from '../../services/http/user/user.service';
import {Genre} from '../../models/api/genre';
import {MoviesTvDataService} from '../../services/http/moviesTvData/movies-tv-data.service';
import {Feed} from '../../models/api/feed';
import {PageEvent} from '@angular/material';
import {DialogService} from '../../services/dialog/dialog.service';
import {MessageService} from '../../services/message/message.service';
import {GenericResponse} from '../../models/response';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input()
  tab: {media_type: string; genre: Genre};

  public feed: Feed = {
    result: [],
    page: 0,
    pages: 0
  };

  constructor(public userService: UserService,
              public movieTvDataService: MoviesTvDataService,
              public dialogService: DialogService,
              public messageService: MessageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(page: number = 1) {
    if (this.tab.media_type === 'movie') {
      this.movieTvDataService.discoverMovie(this.tab.genre.id, page).then(tvs => {
        console.log('ResultComponent discoverTv');
        this.feed = tvs;
      });
    } else if (this.tab.media_type === 'tv') {
      this.movieTvDataService.discoverTv(this.tab.genre.id, page).then(movies => {
        console.log('ResultComponent discoverMovies');
        this.feed = movies;
      });
    }
  }

  addToFavorites(feedItem: FeedItem) {
    this.userService.addFavorites(feedItem).then((result) => {
      if ('message' in result) {
        this.dialogService.showSuccess(this.messageService.textsMessages.successFavorite);
      }
    });
  }

  pageChanged(event: PageEvent) {
    this.loadData(event.pageIndex + 1);
  }
}
