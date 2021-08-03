import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      movie: {},
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(updatedMovie) {
    this.setState(
      { status: false },
      () => {
        const dataMovie = movieAPI.updateMovie(updatedMovie);
        this.setState({
          status: true,
          movie: dataMovie,
          shouldRedirect: true,
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

export default EditMovie;
