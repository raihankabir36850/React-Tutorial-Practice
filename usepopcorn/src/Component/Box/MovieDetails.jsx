import { useEffect } from 'react';
import Loader from '../Loader';
import StarRating from '../StarRating';
import useFetchMovieDetails from '../../hooks/useFetchMovieDetails';

export default function MovieDetails({ movieId, onClosekMovieItem, addWatchItem, watched }) {
  const { movieDetails, isLoading } = useFetchMovieDetails(movieId);
  const selectedMovieDetail = watched.find((item) => item.imdbID === movieDetails.imdbID);

  function addMovieInWatchList(rating, count) {
    const newWatchItem = {
      imdbID: movieDetails.imdbID,
      Title: movieDetails.Title,
      Poster: movieDetails.Poster,
      runtime: Number(movieDetails.Runtime.split(' ')[0]),
      imdbRating: movieDetails.imdbRating,
      userRating: rating,
      clickCount: count,
    };
    addWatchItem(newWatchItem);
    onClosekMovieItem();
  }

  useEffect(
    function () {
      if (!movieDetails.Title) {
        return;
      }
      document.title = `Usepopcorn | ${movieDetails.Title}`;
      return () => {
        document.title = 'usePopcorn';
      };
    },
    [movieDetails]
  );

  return (
    <div className='details'>
      {isLoading ? (
        <Loader message='Loading...' />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onClosekMovieItem}>
              ←
            </button>
            <img src={movieDetails.Poster} alt={`poster of ${movieDetails.Title} movie`} />
            <div className='details-overview'>
              <h2>{movieDetails.Title}</h2>
              <p>
                {movieDetails.Released} • {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Genre}</p>
              <p>
                <span>⭐️</span>
                {movieDetails.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            {selectedMovieDetail ? (
              <div className='rating'>
                <p>
                  You rated with movie {selectedMovieDetail.userRating} <span>⭐️</span>
                </p>
              </div>
            ) : (
              <StarRating maxLength={10} addMovieInWatchList={addMovieInWatchList} />
            )}
            <p>
              <em>{movieDetails.Plot}</em>
            </p>
            <p>Starring {movieDetails.Actors}</p>
            <p>Directed by {movieDetails.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
