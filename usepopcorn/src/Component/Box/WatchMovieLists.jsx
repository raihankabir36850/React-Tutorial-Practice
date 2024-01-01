import WatchMovieItem from './WatchMovieItem';

function WatchMovieLists({ watched, removeWatchItem }) {
  return (
    <>
      <ul className='list list-movies'>
        {watched.map((movie) => (
          <WatchMovieItem movie={movie} key={movie.imdbID} removeWatchItem={removeWatchItem} />
        ))}
      </ul>
    </>
  );
}

export default WatchMovieLists;
