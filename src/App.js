// @flow
import React, { Component } from 'react';
import {Loader, Input, Menu, Item, Grid, Image } from 'semantic-ui-react';
import { MoviesList } from './components';
import { getMovies } from './servies';
import './App.css';

const LoaderMassive = () => (
  <Loader active inline='centered' size="massive">
    Loading...
  </Loader>
)

type AppProps = {
  isLoading: boolean,
  activeItem: string,
  movies: Array<Object>,
  error: boolean,
  errorMessage: string
}

const CONTENT_TYPE = {
  topRated: 'topRated',
  nowPlaying: 'nowPlaying'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      activeItem: CONTENT_TYPE.nowPlaying,
      movies: [],
      error: false,
      errorMessage: ''
    }
  }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll)
    this.fetchMovies(this.state.activeItem)
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState)
    if (nextState.activeItem !== this.state.activeItem) {
      this.fetchMovies(nextState.activeItem)
    }
    return true
  }

  fetchMovies = (type, isCont: boolean = false) => {
    const self = this;
    this.setState({
      isLoading: true
    })
    getMovies(type).then(data => {
      let moviesData = []
      if (isCont) {
        moviesData = this.state.movies.concat(data.results);
      } else {
        moviesData = data.results
      }
      self.setState({
        ...this.state,
        isLoading: false,
        movies: moviesData
      }, () => {
        console.log('list movies', this.state.movies)
      })
    }).catch(error => {
      self.setState({
        error: true,
        errorMessage: `Something wrong !!!`
      })
    })
  }

  render() {
    const { isLoading, activeItem, movies } = this.state
    return (
    <div className="appContainer">
      <Grid container >
        <Menu pointing secondary>
          <Menu.Item header>muvee.io</Menu.Item>
          <Menu.Item name='nowPlaying' active={activeItem === 'nowPlaying'} onClick={this.handleItemClick} />
          <Menu.Item name='topRated' active={activeItem === 'topRated'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid>
      <Grid container columns={3}>
        <div className="page-content row">
        {isLoading
          ? <LoaderMassive />
          : <MoviesList movies={movies} />
        }

        </div>
      </Grid>
  </div>
    );
  }
}

export default App;
