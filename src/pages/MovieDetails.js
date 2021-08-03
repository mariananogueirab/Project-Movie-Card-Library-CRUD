import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';
import MovieInfos from '../components/MovieInfos';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: false,
      movie: {},
    };
  }

  componentDidMount() {
    this.getMovieInfos();
  }

  getMovieInfos = () => {
    this.setState(
      { loadingStatus: true },
      async () => {
        const { match } = this.props;
        const dataMovie = await movieAPI.getMovie(match.params.id);
        this.setState({
          loadingStatus: false,
          movie: dataMovie,
        });
      },
    );
  }

  render() {
    const { loadingStatus, movie } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = movie;
    const { match } = this.props;

    return (
      <div data-testid="movie-details">
        {loadingStatus ? <Loading /> : <MovieInfos
          title={ title }
          storyline={ storyline }
          imagePath={ imagePath }
          genre={ genre }
          rating={ rating }
          subtitle={ subtitle }
        />}
        <Link to="/">VOLTAR</Link>
        <Link to={ `/movies/${match.params.id}/edit` }>EDITAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default MovieDetails;
