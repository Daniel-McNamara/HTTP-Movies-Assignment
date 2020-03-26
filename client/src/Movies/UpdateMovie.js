import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

const UpdateMovie = props => {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  console.log(movie);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const editMovie = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("Post Res", res);
        props.history.push("/");
      })
      .catch(err => console.log("Post Error", err));
  };

  const handleChange = e => {
    setMovie({ ...movie, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={editMovie}>
        <lable>
          <input
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            value={movie.title}
          />
        </lable>
        <lable>
          <input
            id="director"
            name="director"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            value={movie.director}
          />
        </lable>
        <lable>
          <input
            id="metascore"
            name="metascore"
            type="number"
            autoComplete="off"
            onChange={handleChange}
            value={movie.metascore}
          />
        </lable>
        <button type="submit" onClick={editMovie}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;