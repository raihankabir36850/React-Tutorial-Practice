import WatchMovieItem from './WatchMovieItem';

export default function WatchMovieLists({ watched, removeWatchItem }) {
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
