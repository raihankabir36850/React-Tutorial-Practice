function SearchBar({ query, searchQueryHandler }) {
  return <input type='text' className='search' placeholder='Search movies...' onChange={searchQueryHandler} />;
}

export default SearchBar;
