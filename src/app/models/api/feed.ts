import {FeedItem} from './feedItem';

export interface Feed {
  page: number;
  pages: number;
  result: FeedItem[];
}
