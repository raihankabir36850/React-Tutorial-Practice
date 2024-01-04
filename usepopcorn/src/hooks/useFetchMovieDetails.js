import { useEffect, useState } from 'react';

export default function useFetchMovieDetails(movieId) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchMovieDetails() {
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
      }
      fetchMovieDetails();
    },
    [movieId]
  );

  return { movieDetails, isLoading };
}
