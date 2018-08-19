import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../services/message/message.service';
import {AuthService} from '../../services/http/auth/auth.service';
import {UserService} from '../../services/http/user/user.service';
import {FeedItem} from '../../models/api/feedItem';
import {Router} from '@angular/router';
import {DialogService} from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public favorites: FeedItem[];

  constructor(public messageService: MessageService,
              public userService: UserService,
              public authService: AuthService,
              public router: Router,
              public dialogService: DialogService) { }

  async ngOnInit() {
    if (this.authService.isLogged()) {
      this.favorites = await this.userService.getFavorites();
    }
  }

  removeToFavorites(result: FeedItem) {
    this.userService.deleteFavorites(result).then(async (msg) => {
      this.dialogService.showSuccess(this.messageService.textsMessages.successRemoveFavorite);
      this.favorites = await this.userService.getFavorites();
    });
  }
}
