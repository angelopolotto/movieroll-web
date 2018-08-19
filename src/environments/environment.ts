// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const movieRollUrl = `https://upcoming-mobify-app.herokuapp.com/api/v1`;
// const movieRollUrl = `https://movieroll.herokuapp.com/api/v1`;
// const movieRollUrl = `http://localhost:3000/api/v1`;

export const environment = {
  production: false,

  apiUrls : {
    // auth - no token
    login: `${movieRollUrl}/auth/login`,
    register: `${movieRollUrl}/auth/register`,
    refreshToken: `${movieRollUrl}/auth/refreshToken`,
    publicToken: `${movieRollUrl}/auth/publicToken`,
    languages: `${movieRollUrl}/auth/languages`,

    // user - private token
    user: `${movieRollUrl}/user/{{user_id}}`,

    // favorites - private token
    favoritesGet: `${movieRollUrl}/favorites`,
    favoritesWatchedGet: `${movieRollUrl}/favorites/watched`,
    favorites: `${movieRollUrl}/favorites/{{movie_id}}`,

    // genres/discover - public token
    genresMovie: `${movieRollUrl}/genres/movie`,
    genresTv: `${movieRollUrl}/genres/tv`,
    discoverMovie: `${movieRollUrl}/discover/movie?with_genres={{genre_id}}&page={{page}}`,
    discoverTv: `${movieRollUrl}/discover/tv?with_genres={{genre_id}}&page={{page}}`
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import "zone.js/dist/zone-error";  // Included with Angular CLI.
