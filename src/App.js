// @flow
import React, { Component } from 'react';
import {Loader, Input, Menu, Item, Grid, Image, Icon, Header, Button } from 'semantic-ui-react';
import { sleep, compareMovieObjs } from './utils';
import { MoviesList, InternetModal} from './components';
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
  errorMessage: string,
  currentPage: number,
  searchTerm: string
}

const CONTENT_TYPE = {
  topRated: 'topRated',
  nowPlaying: 'nowPlaying'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNet: true,
      isLoading: true,
      activeItem: CONTENT_TYPE.nowPlaying,
      movies: [],
      error: false,
      errorMessage: '',
      currentPage: 1,
      searchTerm: ''
      }
  }
  
  handleItemClick = (e, { name }) => {
    if (name !== this.state.activeItem) {
      this.setState({ 
        activeItem: name, 
        movies: []
      }, () => {this.fetchMovies(name)})
    }
  }

  fetchMovies = async (type, isCont: boolean = false) => {
    const self = this;
    this.setState({
      isLoading: true
    })
    if (isCont) {
      this.setState((prevState, props) => {
        return {currentPage: prevState.currentPage + 1};
      });
    } else {
      this.setState({
        currentPage: 1
      })
    }
    getMovies(type, this.state.currentPage).then(data => {
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
      })
    }).catch(error => {
      self.setState({
        error: true,
        errorMessage: `Something wrong !!!`
      })
    })
  }

  handleOnScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight ) >= scrollHeight;
    
    if (scrolledToBottom) {
      this.fetchMovies(this.state.activeItem, true)
    }
  }

  updateOnlineStatus = () => {
    this.setState({ isNet: false })
  }

  handleSortByTitle = () => {
    const sortedList = this.state.movies.sort(compareMovieObjs)
    this.setState({movies: sortedList})
  }

  handleRefresh = () => {
    this.setState({ movies: [] }, () => this.fetchMovies(this.state.activeItem))
  }

  onSearchChange = (e, { value }) => {
    this.setState({ searchTerm: value })
  }

  componentDidMount() {
    this.fetchMovies(this.state.activeItem)
    window.addEventListener('scroll', this.handleOnScroll)
    window.addEventListener('offline', this.updateOnlineStatus);  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  render() {
    const { isLoading, activeItem, movies, isNet, searchTerm } = this.state
    return (
    <div className="appContainer">
      {!isNet && <InternetModal />}
      <Grid container >
        <Menu pointing>
          <Menu.Item header>MUVEE.IO</Menu.Item>
          <Menu.Item name='nowPlaying' active={activeItem === 'nowPlaying'} onClick={this.handleItemClick} />
          <Menu.Item name='topRated' active={activeItem === 'topRated'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button onClick={this.handleSortByTitle}>
                <Icon name='filter'/> Title
            </Button>
            </Menu.Item>
             <Menu.Item>
                <Button onClick={this.handleRefresh}>
                <Icon name='refresh'/> Refresh
            </Button>
            </Menu.Item>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' onChange={this.onSearchChange} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid>
      <Grid container columns={3}>
        <div className="page-content row">
          <MoviesList movies={movies.filter(obj => (obj.original_title.includes(searchTerm)))} />
          {isLoading && <LoaderMassive />}
        </div>
      </Grid>
  </div>
    );
  }
}

export default App;
