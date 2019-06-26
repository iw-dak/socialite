import React, { Component } from 'react';
import MovieList from './MovieList';

class MovieListContainer extends Component {
    state = {
        movies: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/movies', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJLYWJhIiwiaWF0IjoxNTU5OTE2MzAzLCJleHAiOjE1NTk5MTk5MDN9.3mywM3HhvUMmY-4LKlfb47FEPiePP3Uwpn10qBKy7t8"
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Fail to fetch');
                }
            })
            .then(data => {
                this.setState({movies: data})
            })
            .catch();
    }

    render() {
        return (
            <MovieList movies={this.state.movies} />
        );
    }
}

export default MovieListContainer;
