export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  language: string;
  region: string;
  theme: string;
}

export interface UserProfile {
  user_id: string;
  name: string;
  email: string;
  language: string;
  region: string;
  theme: string;
  token: string;
}

export interface Token {
  token: string;
}

export interface Language {
  languageCode: string;
  description: string;
  language: string;
  region: string;
}

export enum UserStates {
  Logged,
  Unlogged
}
