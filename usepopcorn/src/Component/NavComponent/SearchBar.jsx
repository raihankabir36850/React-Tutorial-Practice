import { useRef, useEffect } from 'react';

function SearchBar({ query, searchQueryHandler }) {
  const inputEl = useRef(null);
  useEffect(function () {
    inputEl.current.focus();
  }, []);
  return <input type='text' className='search' placeholder='Search movies...' onChange={searchQueryHandler} ref={inputEl} />;
}

export default SearchBar;
