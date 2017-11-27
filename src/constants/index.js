export const API = {
  token: '3985d4ca75a13af67ee4bde7a1e379ae',
  root_url: 'https://api.themoviedb.org/3/',
}

export const ApiEnpoint = {
  movies: {
    topRated: API.root_url + 'movie/top_rated?api_key=' + API.token,
    nowPlaying: API.root_url + 'movie/now_playing?api_key=' + API.token,
    searchMovies: API.root_url + 'search/movie?api_key=' + API.token
  }
}

export const media = {
  url: {
    thumbnail: 'https://image.tmdb.org/t/p/w370_and_h556_bestv2',
    backdrop: 'https://image.tmdb.org/t/p/w1400_and_h450_bestv2'
  }
}
