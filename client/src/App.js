import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';
import SavedList from './Movies/SavedList';
import {BrowserRouter as Router, Route, Link, Switch, useParams} from 'react-router-dom';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('https://responsive-design-backend.onrender.com/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          console.log(response.data);
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <Router>
    <SavedList list={[ /* This is stretch */]} />
    <div>
      <Switch>
        
        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>
        <Route path="/movies/:movieID">
          <Movie  key={movieList.id} movies={movieList} />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}