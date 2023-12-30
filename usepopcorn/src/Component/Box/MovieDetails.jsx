import { useEffect, useState } from 'react';
import Loader from '../Loader';
export default function MovieDetails({ movieId }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const fetchMovieDetails = async () => {
        setIsLoading(true);
        const res = await fetch(`https://www.omdbapi.com/?apikey=c2876157&i=${movieId}`);
        const data = await res.json();
        console.log(data);
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
        };

        setMovieDetails({ ...movieData });

        setIsLoading(false);
      };
      fetchMovieDetails();
    },
    [movieId]
  );

  console.log(movieDetails);
  return (
    <div className='details'>
      {isLoading ? (
        <Loader message='Loading...' />
      ) : (
        <>
          <header>
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
