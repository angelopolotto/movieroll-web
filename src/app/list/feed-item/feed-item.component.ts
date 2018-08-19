import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FeedItem} from '../../models/api/feedItem';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})
export class FeedItemComponent implements OnInit {
  @Input()
  feedItem: FeedItem;

  @Input()
  favButtonText: string = null;

  @Output()
  OnAddToFav: EventEmitter<FeedItem> = new EventEmitter();

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

  addToFavorites(feedItemClicked: FeedItem) {
    (<any>window).gtag('event', 'view_item_list', {
      'event_label': 'add to favorites list',
      'event_media_id': `${feedItemClicked.media_id}`,
      'event_media_title': `${feedItemClicked.title}`,
      'event_category': 'media_favorited',
      'non_interaction': true
    });
    this.OnAddToFav.emit(feedItemClicked);
  }

  gtagEvent(eventLabel, eventLink, eventCategory) {
    (<any>window).gtag('event', 'view_item_list', {
      'event_label': eventLabel,
      'event_link': eventLink,
      'event_category': eventCategory,
      'non_interaction': true
    });
  }
}
