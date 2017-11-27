import { ApiEnpoint } from '../constants';

export const getMovies = (type) => {
  console.log(type, ApiEnpoint.movies[type]);
  if (type !== 'search') {
    return new Promise((resolve, reject) => {
      fetch(ApiEnpoint.movies[type])
			  .then(response => resolve(response.json()))
        .catch(error => reject(error))
    })
  }
}
