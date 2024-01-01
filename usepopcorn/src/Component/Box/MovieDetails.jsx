import { useEffect, useState } from 'react';
import Loader from '../Loader';
import StarRating from '../StarRating';

export default function MovieDetails({ movieId, onClosekMovieItem, addWatchItem, watched }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const fetchMovieDetails = async () => {
        setIsLoading(true);
        const res = await fetch(`https://www.omdbapi.com/?apikey=c2876157&i=${movieId}`);
        const data = await res.json();
        const movieData = {
          Poster: data.Poster,
          Title: data.Title,
          Released: data.Released,
          Runtime: data.Runtime,
          Genre: data.Genre,
          imdbRating: data.imdbRating,
          Plot: data.Plot,
          Actors: data.Actors,
          Director: data.Director,
          imdbID: data.imdbID,
        };

        setMovieDetails({ ...movieData });

        setIsLoading(false);
      };
      fetchMovieDetails();
    },
    [movieId]
  );

  const selectedMovieDetail = watched.find((item) => item.imdbID === movieDetails.imdbID);

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
              <StarRating maxLength={10} addWatchItem={addWatchItem} movieDetails={movieDetails} />
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
