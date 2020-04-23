import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function UpdateMovie(props) {
  const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
  };
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        // console.log(res);
        props.getMovieList();
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='form'>
      <h2 className='update'>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          onChange={handleChange}
          placeholder='Title'
          value={movie.title}
          required
        />
        <div className='baseline' />

        <input
          type='text'
          name='director'
          onChange={handleChange}
          placeholder='Director'
          value={movie.director}
          required
        />
        <div className='baseline' />

        <input
          type='text'
          name='metascore'
          onChange={handleChange}
          placeholder='Metascore'
          value={movie.metascore}
        />
        <div className='baseline' />

        <button className='update-button'>Update</button>
      </form>
    </div>
  );
}
