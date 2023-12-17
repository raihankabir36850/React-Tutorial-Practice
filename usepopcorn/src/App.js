import { useState } from 'react';
import { tempMovieData, tempWatchedData } from './Data';
import NavComponent from './Component/NavComponent/NavComponent';
import SearchBar from './Component/NavComponent/SearchBar';
import NumResults from './Component/NavComponent/NumResults';
import Box from './Component/Box/Box';
import MovieLists from './Component/Box/MovieLists';
import WatchMovieLists from './Component/Box/WatchMovieLists';
import './App.css';

export function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavComponent>
        <SearchBar />
        <NumResults movies={movies} />
      </NavComponent>
      <div className='main'>
        <Box>
          <MovieLists movies={movies} />
        </Box>
        <Box>
          <WatchMovieLists watched={watched} />
        </Box>
      </div>
      <StarRating maxLength={10} />
    </>
  );
}

export function StarRating({ maxLength }) {
  const [mouseOver, setMouseOver] = useState(0);
  const [rating, setRating] = useState(0);

  function clickHandler(index) {
    console.log(index);
    setRating(index + 1);
  }

  function mouseEnterHandler(event, index) {
    setMouseOver(index + 1);
  }

  function mouseOutHandler(event) {
    setMouseOver(0);
  }
  return (
    <div className='starRatingBox'>
      <div className='starContainer'>
        {Array.from({ length: maxLength }, (_, i) => (
          <Star key={i} mouseEnterHandler={mouseEnterHandler} mouseOutHandler={mouseOutHandler} index={i} clickHandler={clickHandler} full={mouseOver ? mouseOver >= i + 1 : rating >= i + 1} />
        ))}
      </div>
      <p className='text-container'>{mouseOver || rating || ''}</p>
    </div>
  );
}

function Star({ mouseEnterHandler, mouseOutHandler, clickHandler, index, full }) {
  return (
    <span className='star' onMouseEnter={(e) => mouseEnterHandler(e, index)} onMouseLeave={(e) => mouseOutHandler(e)} onClick={() => clickHandler(index)}>
      {full ? (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='#fcc419' fill='#fcc419'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='#fcc419' fill='none'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      )}
    </span>
  );
}

export default App;
