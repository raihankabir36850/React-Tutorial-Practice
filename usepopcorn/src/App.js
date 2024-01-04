import { useEffect, useState } from 'react';
import NavComponent from './Component/NavComponent/NavComponent';
import SearchBar from './Component/NavComponent/SearchBar';
import NumResults from './Component/NavComponent/NumResults';
import Box from './Component/Box/Box';
import MovieLists from './Component/Box/MovieLists';
import WatchMovieLists from './Component/Box/WatchMovieLists';
import Loader from './Component/Loader';
import WatchMovieSummery from './Component/Box/WatchMovieSummery';
import MovieDetails from './Component/Box/MovieDetails';

import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    const getWatchItems = localStorage.getItem('watchItem');
    return getWatchItems ? JSON.parse(getWatchItems) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [movieId, setMovieId] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c2876157&s=${query}`);
        if (!res.ok) throw new Error('something went wrong.');
        const data = await res.json();
        if (data.Response === 'False') throw new Error('⛔️ Movies not found.');
        setMovies(data.Search);
      } catch (error) {
        setMovies([]);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      setIsLoading(false);

      return;
    }

    fetchMovies();
  }, [query]);

  const searchQueryHandler = (e) => {
    setQuery(e.target.value);
  };

  const onClickMovieItem = (id) => {
    setMovieId((prevId) => (prevId === id ? '' : id));
  };

  const onClosekMovieItem = () => {
    setMovieId('');
  };

  const addWatchItem = (movieDetails) => {
    localStorage.setItem('watchItem', JSON.stringify([...watched, movieDetails]));
    setWatched([...watched, movieDetails]);
  };

  const removeWatchItem = (id) => {
    const newWatchItems = [...watched].filter((item) => item.imdbID !== id);
    localStorage.setItem('watchItem', JSON.stringify(newWatchItems));
    setWatched(newWatchItems);
  };

  return (
    <>
      <NavComponent>
        <SearchBar query={query} searchQueryHandler={searchQueryHandler} />
        {movies.length > 1 && <NumResults movies={movies} />}
      </NavComponent>
      <div className='main'>
        <Box>
          {isLoading && <Loader message='Loading...' />}
          {!isLoading && !error && <MovieLists movies={movies} onClickMovieItem={onClickMovieItem} />}
          {error && <Loader message={error} />}
        </Box>
        <Box>
          {movieId ? (
            <MovieDetails movieId={movieId} onClosekMovieItem={onClosekMovieItem} addWatchItem={addWatchItem} watched={watched} />
          ) : (
            <>
              <WatchMovieSummery watched={watched} />
              <WatchMovieLists watched={watched} removeWatchItem={removeWatchItem} />
            </>
          )}
        </Box>
      </div>
    </>
  );
}
