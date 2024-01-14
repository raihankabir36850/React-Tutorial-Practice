import React from 'react';
import { getAverage } from '../../Helpers/Utlis';

export default function WatchMovieSummery({ watched }) {
  const watchedMovieLength = watched.length;
  const avgImdbRating = getAverage(watched.map((movie) => movie.imdbRating));
  const avgUserRating = getAverage(watched.map((movie) => movie.userRating));
  const avgRuntime = getAverage(watched.map((movie) => movie.runtime));
  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovieLength} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
