function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length && movies.length}</strong> results
    </p>
  );
}

export default NumResults;
