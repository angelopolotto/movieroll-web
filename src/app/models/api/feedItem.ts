import {New} from './new';
import {Video} from './video';

export interface FeedItem {
  media_id: number;
  status_type: string;
  media_type: string;
  vote_average: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: Date;
  title: string;
  overview: string;
  genres: string[];
  news: New[];
  videos: Video[];
  imdb: string;
  homepage: string;
  language: string;
  region: string;
  original_title: string;
  original_language: string;
  genre_ids: number[];
}
