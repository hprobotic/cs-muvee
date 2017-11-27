// @flow
import React, { Component } from 'react';
import {Loader, Input, Menu, Item, Grid, Image, Icon, Header, Button } from 'semantic-ui-react';
import { sleep } from './utils';
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
      isNet: true,
      isLoading: true,
      activeItem: CONTENT_TYPE.nowPlaying,
      movies: [],
      error: false,
      errorMessage: '',
      currentPage: 1
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
    await sleep(2000)
    if (isCont) {
      this.setState({
        currentPage: this.state.currentPage+1
      })
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
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll)
    window.addEventListener('offline', this.updateOnlineStatus);  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  render() {
    const { isLoading, activeItem, movies, isNet } = this.state
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
              <Button>
                <Icon name='filter'/> Title
            </Button>
            </Menu.Item>
             <Menu.Item>
                <Button>
                <Icon name='refresh'/> Refresh
            </Button>
            </Menu.Item>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid>
      <Grid container columns={3}>
        <div className="page-content row">
          <MoviesList movies={movies} />
          {isLoading && <LoaderMassive />}
        </div>
      </Grid>
  </div>
    );
  }
}

export default App;
