import { ApiEnpoint } from '../constants';

export const getMovies = (type, page) => {
  if (type !== 'search') {
    return new Promise((resolve, reject) => {
      fetch(ApiEnpoint.movies[type]+`&page=${page}`)
			  .then(response => resolve(response.json()))
        .catch(error => reject(error))
    })
  }
}
