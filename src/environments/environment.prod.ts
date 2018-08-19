// const movieRollUrl = `https://movieroll.herokuapp.com/api/v1`;
const movieRollUrl = `https://movieroll.app.polotto.cloud/api/v1`;

export const environment = {
  production: true,

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
