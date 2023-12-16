import WatchMovieItem from './WatchMovieItem';
import WatchMovieSummery from './WatchMovieSummery';

function WatchMovieLists({ watched }) {
  return (
    <>
      <WatchMovieSummery watched={watched} />
      <ul className='list list-movies'>
        {watched.map((movie) => (
          <WatchMovieItem movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </>
  );
}

export default WatchMovieLists;
