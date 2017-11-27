import React from 'react'
import MovieItem from './MovieItem/MovieItem.js';
import './MoviesList.css'

class MoviesList extends React.Component {
  render() {
  const { movies } = this.props;
    return (
      <div className="movies-list">
        {movies.map(item => (<MovieItem key={item.id} movie={item} />))}
      </div>
    )
  }
}

export default MoviesList
