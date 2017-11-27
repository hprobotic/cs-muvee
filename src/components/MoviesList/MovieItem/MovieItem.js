import React from 'react'
import { Icon } from 'semantic-ui-react'
import { media } from '../../../constants'
import './MovieItem.css'

class MovieItem extends React.Component {
  render() {
  const { movie } = this.props;
    return(
      <div className="movie-item">
        <img src={media.url.thumbnail + movie.poster_path} />
        <p className="movie-title">{movie.original_title}</p>
        <p className="movie-meta"><Icon name="calendar"/> <span className="date">{movie.release_date}</span> &nbsp; &nbsp;  <Icon name="star" /> <span className="rate">{movie.vote_average}</span></p>
      </div>
    )
  }
}

export default MovieItem;
