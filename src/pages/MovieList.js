import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loadingStatus: true,
    };
  }

  componentDidMount() {
    this.getArrayOfMovies();
  }

  getArrayOfMovies = () => {
    this.setState(
      { loadingStatus: true },
      async () => {
        const dataMovies = await movieAPI.getMovies();
        this.setState({
          loadingStatus: false,
          movies: [...dataMovies],
        });
      },
    );
  }

  render() {
    const { movies, loadingStatus } = this.state;
    const loading = <p>Carregando...</p>;

    return (
      <div data-testid="movie-list">
        {loadingStatus ? loading : movies
          .map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;
