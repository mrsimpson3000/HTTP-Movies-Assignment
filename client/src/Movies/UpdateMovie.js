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
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className='form'>
      <h2 className='update'>Update Movie</h2>
      <form>
        <input
          type='text'
          name='title'
          // onChange={changeHandler}
          placeholder='Title'
          // value={item.name}
          required
        />
        <div className='baseline' />

        <input
          type='text'
          name='director'
          // onChange={changeHandler}
          placeholder='Director'
          // value={item.price}
        />
        <div className='baseline' />

        <input
          type='text'
          name='metascore'
          // onChange={changeHandler}
          placeholder='Metascore'
          // value={item.imageUrl}
        />
        <div className='baseline' />

        <button className='update-button'>Update</button>
      </form>
    </div>
  );
}
