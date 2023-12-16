function MovieItem({ movie }) {
  const { Poster, Title, Year } = movie;
  return (
    <li>
      <img src={Poster} alt={Title} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieItem;
