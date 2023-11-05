import WatchMovieItem from './WatchMovieItem';

function WatchMovieLists({ watched }) {
    return (
        <ul className="list list-movies">
            {watched.map((movie) => (
                <WatchMovieItem movie={movie} />
            ))}
        </ul>

    );
};

export default WatchMovieLists;