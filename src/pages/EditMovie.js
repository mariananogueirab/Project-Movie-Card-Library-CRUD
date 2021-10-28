import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      movie: {},
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getMovieInfo();
  }

  handleSubmit(updatedMovie) {
    movieAPI.updateMovie(updatedMovie);
    this.setState({
      shouldRedirect: true,
    });
  }

  getMovieInfo = async () => {
    const { match } = this.props;
    this.setState(
      { status: true },
      async () => {
        const movieInfo = await movieAPI.getMovie(match.params.id);
        this.setState({
          movie: movieInfo,
          status: false,
        });
      },
    );
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    return (
      <div data-testid="edit-movie">
        {status ? <Loading /> : <MovieForm
          movie={ movie }
          onSubmit={ this.handleSubmit }
        />}
        {shouldRedirect && <Redirect to="/" />}
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default EditMovie;
