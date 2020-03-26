import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;

  const deleteFriend = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("Delete Response", res);
        props.setMovies(props.movies.filter(movie => movie.id !== res.data));
      })
      .catch(err => console.log("Delete Error", err));
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <Link to={`/update-movie/${id}`}>Edit Movie</Link>
      <button onClick={deleteFriend}>Delete Movie</button>
    </div>
  );
};

export default MovieCard;
