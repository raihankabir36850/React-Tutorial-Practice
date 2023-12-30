import MovieItem from './MovieItem';
function MovieLists({ movies, onClickMovieItem }) {
  return (
    <ul className='list list-movies'>
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} onClickMovieItem={() => onClickMovieItem(movie.imdbID)} />
      ))}
    </ul>
  );
}

export default MovieLists;
