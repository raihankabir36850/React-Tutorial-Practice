function WatchMovieItem({ movie, removeWatchItem }) {
  const { Poster, imdbID, Title, imdbRating, userRating, runtime } = movie;
  return (
    <li key={imdbID}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
        <button className='btn-delete' onClick={() => removeWatchItem(imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}

export default WatchMovieItem;
