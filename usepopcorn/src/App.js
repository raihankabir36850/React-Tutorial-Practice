import { tempMovieData, tempWatchedData } from './Data';
import './App.css';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      <NavComponent>
        <SearchBar />
        <NumResults movies={movies} />
      </NavComponent>
      <div className='main'>
        <MovieLists movies={movies} />
        <WatchMovieLists watched={watched} />
      </div>
    </>
  );
}

function MovieLists({ movies }) {
  return (
    <div className='box'>
      <button className='btn-toggle'>–</button>
      <ul className='list list-movies'>
        {movies.map((movie) => (
          <MovieItem movie={movie} />
        ))}
      </ul>
    </div>
  );
}

function MovieItem() {
  return (
    <li>
      <img src='https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg' alt='Inception poster' />
      <h3>Inception</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>2010</span>
        </p>
      </div>
    </li>
  );
}

function WatchMovieLists({ watched }) {
  return (
    <div className='box'>
      <button className='btn-toggle'>–</button>
      <ul className='list list-movies'>
        {watched.map((movie) => (
          <WatchMovieItem movie={movie} />
        ))}
      </ul>
    </div>
  );
}

function WatchMovieItem({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function NavComponent({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar() {
  return <input type='text' className='search' placeholder='Search movies...' />;
}

function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default App;
