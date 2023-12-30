import WatchMovieItem from './WatchMovieItem';

function WatchMovieLists({ watched }) {
  return (
    <>
      <ul className='list list-movies'>
        {watched.map((movie) => (
          <WatchMovieItem movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </>
  );
}

export default WatchMovieLists;
