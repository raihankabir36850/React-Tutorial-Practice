import MovieItem from './MovieItem';
function MovieLists({ movies }) {
    return (
        <ul className="list list-movies">
            {movies.map((movie) => (
                <MovieItem movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
};

export default MovieLists;