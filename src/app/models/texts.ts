import {ConfirmDialogData} from './messages';

export interface MediaType {
  media_type: string;
  movie: string;
  tv: string;
}

export interface TypesName {
  typesName: string;
  none: string;
  tv_airing_today: string;
  tv_on_the_air: string;
  tv_popular: string;
  tv_top_rated: string;
  movie_upcoming: string;
  movie_now_playing: string;
  movie_popular: string;
  movie_top_rated: string;
}

export interface TextDashboard {
  languageCode: string;
  filters: string;
  media_type: MediaType;
  genres: string;
  vote_average: string;
  popularity: string;
  release_date: string;
  overview: string;
  news: string;
  videos: string;
  typesName: TypesName;
  addWatchList: string;
  closeTab: string;
  feedTab: string;
  discoverTab: string;
  imdb: string;
  homepage: string;
}

export interface TextMessages {
  languageCode: string;
  successFavorite: string;
  successRemoveFavorite: string;
  successUpdated: string;
  favoritesEmpty: string;
  dialogNotLogged: ConfirmDialogData;
}

export interface TextLogin {
  languageCode: string;
  welcome: string;
  email: string;
  password: string;
  login: string;
  createAccount: string;
  register: string;
}

export interface TextRegister {
  languageCode: string;
  welcome: string;
  name: string;
  email: string;
  theme: string;
  language: string;
  password: string;
  register: string;
}

export interface TextErrors {
  languageCode: string;
  required: string;
  name: string;
  email: string;
  password: string;
  theme: string;
  language: string;
  noInternet: string;
  generic: string;
}

export interface TextMenus {
  languageCode: string;
  menu: string;
  name: string;
  login: string;
  register: string;
  welcome: string;
  resetLanguage: string;
  logout: string;
}

export interface TextUser {
  languageCode: string;
  favorites: string;
  favoritesEmpty: string;
  settings: string;
  watched:  string;
  name: string;
  email: string;
  theme: string;
  language: string;
  password: string;
  update: string;
}
