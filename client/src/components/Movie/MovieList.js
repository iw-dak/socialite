import React from "react";

const MovieList = ({ movies }) =>
  <ul>
    {movies.map((movie, index) => <li key={index}>{movie.title}</li>)}
  </ul>

export default MovieList;
