export default function MovieItem({ movie, onClickMovieItem }) {
  const { Poster, Title, Year } = movie;
  return (
    <li onClick={onClickMovieItem}>
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
