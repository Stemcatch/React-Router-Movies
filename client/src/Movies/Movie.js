import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
export default function Movie(props) {
  const [movie, setMovie] = useState();
  const {movieID} = useParams();
  // const id = 1;  only works with a number here
  // Change ^^^ that line and use a hook to obtain the :id parameter from the URL


  useEffect(() => {

  const id = movieID; // only works with a num
    console.log(id);
    axios
      .get(`https://responsive-design-backend.onrender.com/api/movies/${id}`) // Study this endpoint with Postman
      .then(response => {
        // Study this response with a breakpoint or log statements
        // and set the response data as the 'movie' slice of state
        setMovie(response.data);
        console.log(movie);
      })
      .catch(error => {
        console.error(error);
      });
    // This effect should run every time time
    // the `id` changes... How could we do this?
  }, [movieID]);

  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = evt => { }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
console.log(movie);
  return (
    <div className="save-wrapper">
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
      </div>
      <div className="save-button">Save</div>
    </div>
  );
}